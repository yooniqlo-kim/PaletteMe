    package com.ssafy.paletteme.domain.myMuseum.service;

    import com.ssafy.paletteme.domain.artworks.entity.Artworks;
    import com.ssafy.paletteme.domain.artworks.repository.ArtworksRepository;
    import com.ssafy.paletteme.domain.artworks.repository.UsersArtworksLikeRepository;
    import com.ssafy.paletteme.domain.myMuseum.dto.RecommendResponse;
    import com.ssafy.paletteme.domain.myMuseum.entity.UsersRecommendHistory;
    import com.ssafy.paletteme.domain.myMuseum.repository.UsersRecommendHistoryRepository;
    import com.ssafy.paletteme.domain.users.repository.UsersFavoriteColorRepository;
    import lombok.RequiredArgsConstructor;
    import org.springframework.data.domain.PageRequest;
    import org.springframework.data.domain.Pageable;
    import org.springframework.stereotype.Service;

    import java.time.LocalDateTime;
    import java.util.*;
    import java.util.stream.Collectors;

    @Service
    @RequiredArgsConstructor
    public class RecommendColorService implements RecommendService {

        private final UsersFavoriteColorRepository usersFavoriteColorRepository;
        private final UsersRecommendHistoryRepository usersRecommendHistoryRepository;
        private final UsersArtworksLikeRepository usersArtworksLikeRepository;
        private final ArtworksRepository artworksRepository;

        @Override
        public List<RecommendResponse> recommend (int userId, int limit) {
            // 사용자가 선호하는 색상 조회
            List<String> favoriteColors = usersFavoriteColorRepository.findColorNamesByUserId(userId);

            // 최근 2주동안 추천한 작품 조회
            List<String> excludedIds = getRecentRecommendedArtworkIds(userId);

            // 추천 후보 생성
            List<RecommendResponse> candidates = generateCandidates(favoriteColors, excludedIds, limit, userId);

            // limit 개수만큼 자르기
            List<RecommendResponse> finalResponses = limitCandidates(candidates, limit);

            // 추천 이력 저장
            saveRecommendationHistory(userId, finalResponses);

            return finalResponses;
        }

        @Override
        public List<String> getRecentRecommendedArtworkIds (int userId) {
            LocalDateTime twoWeeksAgo = LocalDateTime.now().minusWeeks(2);
            List<String> alreadyRecommendIds = usersRecommendHistoryRepository.findArtworkIds(userId,twoWeeksAgo);

            return alreadyRecommendIds != null ? alreadyRecommendIds : new ArrayList<>();
        }

        public List<RecommendResponse> generateCandidates(List<String> favoriteColors, List<String> excludedIds, int limit, int userId) {
            List<RecommendResponse> results = new ArrayList<>();
            int perColorLimit = 2 * limit;
            Random random = new Random();

            for (String color : favoriteColors) {
                // 해당 색상에서 제외할 ID를 뺀 전체 작품 수 조회
                int totalCount = artworksRepository.countByColorAndIdNotIn(color, excludedIds);
                if (totalCount <= 0) continue;

                // 랜덤 페이지로 조회 범위 제한
                int maxPage = (int) Math.ceil((double) totalCount / perColorLimit);
                int randomPage = random.nextInt(maxPage);
                Pageable pageable = PageRequest.of(randomPage, perColorLimit);

                // 후보 작품 조회 및 DTO 변환
                List<Artworks> artworks = artworksRepository.findByColorAndIdNotIn(color, excludedIds, pageable);
                results.addAll(mapToResponses(artworks, userId));
            }

            Collections.shuffle(results);
            return results;
        }

        private List<RecommendResponse> mapToResponses(List<Artworks> artworks, int userId) {
            List<String> artworkIds = artworks.stream()
                    .map(Artworks::getArtworkId)
                    .collect(Collectors.toList());

            Set<String> likedArtworkIds = usersArtworksLikeRepository
                    .findByUserUserIdAndArtworkArtworkIdIn(userId, artworkIds)
                    .stream()
                    .map(like -> like.getArtwork().getArtworkId())
                    .collect(Collectors.toSet());

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
                    .map(r -> UsersRecommendHistory.of(userId, r.getArtworkId(), "color"))
                    .collect(Collectors.toList());
            usersRecommendHistoryRepository.saveAll(history);
        }

    }
