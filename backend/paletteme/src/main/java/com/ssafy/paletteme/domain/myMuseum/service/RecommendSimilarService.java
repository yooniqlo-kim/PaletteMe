package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import com.ssafy.paletteme.domain.artworks.repository.ArtworksRepository;
import com.ssafy.paletteme.domain.artworks.repository.UsersArtworksLikeRepository;
import com.ssafy.paletteme.domain.myMuseum.dto.RecommendResponse;
import com.ssafy.paletteme.domain.myMuseum.entity.UsersRecommendHistory;
import com.ssafy.paletteme.domain.myMuseum.repository.UsersRecommendHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendSimilarService implements RecommendService {

    private final UsersArtworksLikeRepository usersArtworksLikeRepository;
    private final UsersRecommendHistoryRepository usersRecommendHistoryRepository;
    private final ArtworksRepository artworksRepository;

    @Override
    public List<RecommendResponse> recommend(int userId, int limit) {
        // 내가 좋아한 작품 ID들
        List<String> likedArtworkIds = usersArtworksLikeRepository.findLikedArtworkIdsByUserId(userId);

        // 최근 추천된 작품 ID들 제외
        List<String> excludedIds = getRecentRecommendedArtworkIds(userId);

        // 추천 후보 생성
        List<RecommendResponse> candidates = generateCandidates(likedArtworkIds, excludedIds, userId);

        // limit 개수만큼 자르기
        List<RecommendResponse> finalResponses = limitCandidates(candidates, limit);

        // 추천 이력 저장
        saveRecommendationHistory(userId, finalResponses);

        return finalResponses;
    }

    @Override
    public List<String> getRecentRecommendedArtworkIds(int userId) {
        LocalDateTime twoWeeksAgo = LocalDateTime.now().minusWeeks(2);
        List<String> ids = usersRecommendHistoryRepository.findArtworkIds(userId, twoWeeksAgo);
        return ids != null ? ids : new ArrayList<>();
    }

    public List<RecommendResponse> generateCandidates(List<String> likedArtworkIds, List<String> excludedIds, int userId) {
        // 내가 좋아한 작품을 좋아한 다른 유저들이 좋아한 작품들
        List<String> similarUsersLikedArtworkIds = usersArtworksLikeRepository
                .findArtworksLikedByUsersWhoLiked(likedArtworkIds, userId, excludedIds);

        // 해당 작품들 정보 조회
        List<Artworks> artworks = artworksRepository.findAllById(similarUsersLikedArtworkIds);

        return mapToResponses(artworks, userId);
    }

    private List<RecommendResponse> mapToResponses(List<Artworks> artworks, int userId) {
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
                .map(r -> UsersRecommendHistory.of(userId, r.getArtworkId(), "taste"))
                .collect(Collectors.toList());
        usersRecommendHistoryRepository.saveAll(history);
    }
}