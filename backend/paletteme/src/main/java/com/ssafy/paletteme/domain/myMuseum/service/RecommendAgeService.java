package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import com.ssafy.paletteme.domain.artworks.repository.ArtworksRepository;
import com.ssafy.paletteme.domain.artworks.repository.UsersArtworksLikeRepository;
import com.ssafy.paletteme.domain.myMuseum.dto.RecommendResponse;
import com.ssafy.paletteme.domain.myMuseum.entity.UsersRecommendHistory;
import com.ssafy.paletteme.domain.myMuseum.repository.ArtworksRecommendAgeRepository;
import com.ssafy.paletteme.domain.myMuseum.repository.UsersRecommendHistoryRepository;
import com.ssafy.paletteme.domain.users.entity.Users;
import com.ssafy.paletteme.domain.users.exception.UserError;
import com.ssafy.paletteme.domain.users.exception.UserException;
import com.ssafy.paletteme.domain.users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class RecommendAgeService implements RecommendService {

    private final UsersRepository usersRepository;
    private final UsersArtworksLikeRepository usersArtworksLikeRepository;
    private final ArtworksRecommendAgeRepository artworksRecommendAgeRepository;
    private final ArtworksRepository artworksRepository;
    private final UsersRecommendHistoryRepository usersRecommendHistoryRepository;

    @Override
    public List<RecommendResponse> recommend(int userId, int limit) {
        // 1. 사용자 연령대 계산
        int ageGroup = getUserAgeGroup(userId);

        // 2. 연령대 기반 추천 후보 ID 조회 (랜덤)
        List<String> artworkIds = artworksRecommendAgeRepository.findRandomArtworkIdsByAgeGroup(ageGroup, limit);

        // 3. 실제 작품 정보 조회
        List<Artworks> artworks = artworksRepository.findAllById(artworkIds);

        // 4. 좋아요 포함 응답 DTO 변환
        List<RecommendResponse> responses = mapToResponses(artworks, userId);

        // 5. 추천 이력 저장
        saveRecommendationHistory(userId, responses);

        return responses;
    }

    @Override
    public List<String> getRecentRecommendedArtworkIds(int userId) {
        // 제외 로직은 생략
        return List.of();
    }

    private int getUserAgeGroup(int userId) {
        Users user = usersRepository.findById((long) userId)
                .orElseThrow(() -> new UserException(UserError.USER_NOT_FOUND));

        int birthYear = user.getBirthday();
        int currentYear = LocalDate.now().getYear();

        int koreanAge = currentYear - birthYear + 1;

        // 연령대 그룹 (예: 20대 → 20, 30대 → 30)
        return (koreanAge / 10) * 10;
    }

    private List<RecommendResponse> mapToResponses(List<Artworks> artworks, int userId) {
        List<String> artworkIds = artworks.stream()
                .map(Artworks::getArtworkId)
                .collect(Collectors.toList());

        Set<String> likedArtworkIds = new HashSet<>(
                usersArtworksLikeRepository.findLikedArtworkIdsByUserIdAndArtworkIds(userId, artworkIds)
        );

        return artworks.stream()
                .map(art -> RecommendResponse.builder()
                        .artworkId(art.getArtworkId())
                        .imgUrl(art.getImageUrl())
                        .isLiked(likedArtworkIds.contains(art.getArtworkId()))
                        .build())
                .collect(Collectors.toList());
    }

    private void saveRecommendationHistory(int userId, List<RecommendResponse> responses) {
        List<UsersRecommendHistory> history = responses.stream()
                .map(r -> UsersRecommendHistory.of(userId, r.getArtworkId(), "artist"))
                .collect(Collectors.toList());
        usersRecommendHistoryRepository.saveAll(history);
    }
}