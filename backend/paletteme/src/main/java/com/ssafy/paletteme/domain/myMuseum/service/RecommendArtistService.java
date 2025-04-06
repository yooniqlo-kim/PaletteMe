package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import com.ssafy.paletteme.domain.artworks.repository.ArtworksRepository;
import com.ssafy.paletteme.domain.artworks.repository.UsersArtworksLikeRepository;
import com.ssafy.paletteme.domain.myMuseum.dto.RecommendResponse;
import com.ssafy.paletteme.domain.myMuseum.entity.UsersRecommendHistory;
import com.ssafy.paletteme.domain.myMuseum.repository.UsersRecommendHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendArtistService implements RecommendService {

    private final UsersArtworksLikeRepository usersArtworksLikeRepository;
    private final UsersRecommendHistoryRepository usersRecommendHistoryRepository;
    private final ArtworksRepository artworksRepository;

    @Override
    public List<RecommendResponse> recommend(int userId, int limit) {
        List<Integer> likedArtistIds = usersArtworksLikeRepository.findLikedArtworkIdsByUserId(userId);
        List<String> excludedIds = getRecentRecommendedArtworkIds(userId);

        List<RecommendResponse> candidates = generateCandidates(likedArtistIds, excludedIds, userId, limit);
        List<RecommendResponse> finalResponses = limitCandidates(candidates, limit);

        saveRecommendationHistory(userId, finalResponses);
        return finalResponses;
    }

    @Override
    public List<String> getRecentRecommendedArtworkIds(int userId) {
        LocalDateTime twoWeeksAgo = LocalDateTime.now().minusWeeks(2);
        List<String> ids = usersRecommendHistoryRepository.findArtworkIds(userId, twoWeeksAgo);
        return ids != null ? ids : new ArrayList<>();
    }

    public List<RecommendResponse> generateCandidates(List<Integer> artistIds, List<String> excludedIds, int userId, int limit) {
        List<RecommendResponse> results = new ArrayList<>();
        int perArtistLimit = 2 * limit;
        Random random = new Random();

        for (Integer artistId : artistIds) {
            int totalCount = artworksRepository.countByArtistIdAndIdNotIn(artistId, excludedIds);
            if (totalCount <= 0) continue;

            int maxPage = (int) Math.ceil((double) totalCount / perArtistLimit);
            int randomPage = random.nextInt(Math.max(1, maxPage));
            Pageable pageable = PageRequest.of(randomPage, perArtistLimit);

            List<Artworks> artworks = artworksRepository.findByArtistIdAndIdNotIn(artistId, excludedIds, pageable);
            results.addAll(mapToResponses(userId, artworks));
        }

        Collections.shuffle(results);
        return results;
    }

    private List<RecommendResponse> mapToResponses(int userId, List<Artworks> artworks) {
        List<String> artworkIds = artworks.stream()
                .map(Artworks::getArtworkId)
                .collect(Collectors.toList());

        Set<String> likedArtworkIds = new HashSet<>(usersArtworksLikeRepository
                .findLikedArtworkIdsByUserIdAndArtworkIds(userId, artworkIds));

        return artworks.stream()
                .map(art -> RecommendResponse.builder()
                        .artworkId(art.getArtworkId())
                        .imgUrl(art.getImageUrl())
                        .isLiked(likedArtworkIds.contains(art.getArtworkId()))
                        .build())
                .collect(Collectors.toList());
    }

    private List<RecommendResponse> limitCandidates(List<RecommendResponse> candidates, int limit) {
        return candidates.stream()
                .limit(limit)
                .collect(Collectors.toList());
    }

    private void saveRecommendationHistory(int userId, List<RecommendResponse> responses) {
        List<UsersRecommendHistory> history = responses.stream()
                .map(r -> UsersRecommendHistory.of(userId, r.getArtworkId(), "artist"))
                .collect(Collectors.toList());
        usersRecommendHistoryRepository.saveAll(history);
    }

}

