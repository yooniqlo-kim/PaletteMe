package com.ssafy.paletteme.infrastructure.batch.wrapped;

import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.annotation.BeforeStep;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class WrappedStatsProcessor implements ItemProcessor<Integer, WrappedStatsDto> {
    private Map<Integer, Tuple> topArtistMap;
    private Map<Integer, Tuple> rankMap;
    private Map<Integer, Tuple> longestReviewMap;

    @BeforeStep
    public void beforeStep(StepExecution stepExecution) {
        var context = stepExecution.getJobExecution().getExecutionContext();
        this.topArtistMap = (Map<Integer, Tuple>) context.get("topArtistMap");
        this.rankMap = (Map<Integer, Tuple>) context.get("rankMap");
        this.longestReviewMap = (Map<Integer, Tuple>) context.get("longestReviewMap");
    }

    @Override
    public WrappedStatsDto process(Integer userId) throws Exception {
        Tuple topArtist = topArtistMap.get(userId);
        Tuple rank = rankMap.get(userId);
        Tuple longest = longestReviewMap.get(userId);

        // 감상문 랭킹
        int reviewRank = 0;
        int reviewCnt = 0;
        int reviewPercentage = 0;
        if (rank != null) {
            reviewCnt = rank.get(1, Long.class).intValue();

            // 리뷰 개수로 내림차순 정렬 (많이 쓴 사람이 앞에 옴)
            List<Integer> sortedReviewCounts = rankMap.values().stream()
                    .map(t -> t.get(1, Long.class).intValue())
                    .sorted(Comparator.reverseOrder())
                    .toList();

            reviewRank = sortedReviewCounts.indexOf(reviewCnt) + 1;

            int max = sortedReviewCounts.get(0);
            int min = sortedReviewCounts.get(sortedReviewCounts.size() - 1);

            if (max == min) {
                reviewPercentage = 100; // 모든 유저가 동일한 수의 리뷰를 썼다면 100%
            } else {
                // 적게 쓸수록 퍼센트 높고, 많이 쓸수록 퍼센트 낮게
                reviewPercentage = (int) (((double) (max - reviewCnt) / (max - min)) * 99) + 1;
            }
        }

        // --- 최애 작품 ---
        String favoriteName = null;
        String favoriteArtist = null;
        String favoriteImg = null;

        if (longest != null) {
            favoriteName = longest.get(2, String.class);        // originalTitle
            favoriteImg = longest.get(4, String.class);         // imageUrl
            favoriteArtist = longest.get(5, String.class);      // originalArtist
        }

        // --- 추천 작품 (기획에 따라 채우기. 일단 null로 초기화) ---
        String recommendedArtwork = null;
        String recommendedArtist = null;
        String recommendedImg = null;

        return WrappedStatsDto.builder()
                .userId(userId)
                .artistName(topArtist != null ? topArtist.get(2, String.class) : null) // enArtist
                .reviewRank(reviewRank)
                .reviewPercentage(reviewPercentage)
                .reviewCnt(reviewCnt)
                .favoriteName(favoriteName)
                .favoriteArtist(favoriteArtist)
                .favoriteImg(favoriteImg)
                .recommendedArtwork(recommendedArtwork)
                .recommendedArtist(recommendedArtist)
                .recommendedImg(recommendedImg)
                .build();
    }
}
