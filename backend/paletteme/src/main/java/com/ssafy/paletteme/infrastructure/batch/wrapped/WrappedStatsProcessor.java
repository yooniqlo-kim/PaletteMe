package com.ssafy.paletteme.infrastructure.batch.wrapped;

import com.querydsl.core.Tuple;
import com.ssafy.paletteme.domain.recommendation.dto.WrappedRecommendationDto;
import com.ssafy.paletteme.infrastructure.batch.wrapped.dto.WrappedStatsDto;
import com.ssafy.paletteme.infrastructure.batch.wrapped.provider.WrappedGptPromptProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
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
    private List<WrappedRecommendationDto> wrappedRecommendationDtoList;

    private final ChatClient chatClient;

    @BeforeStep
    public void beforeStep(StepExecution stepExecution) {
        var context = stepExecution.getJobExecution().getExecutionContext();
        this.topArtistMap = (Map<Integer, Tuple>) context.get("topArtistMap");
        this.rankMap = (Map<Integer, Tuple>) context.get("rankMap");
        this.longestReviewMap = (Map<Integer, Tuple>) context.get("longestReviewMap");
        this.wrappedRecommendationDtoList = (List<WrappedRecommendationDto>) context.get("wrappedRecommendationDtoList");
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

            // 순서대로 등수 부여 (동점이어도 무조건 다음 등수)
            reviewRank = 0;
            for (int i = 0; i < sortedReviewCounts.size(); i++) {
                if (sortedReviewCounts.get(i) == reviewCnt) {
                    reviewRank = i + 1;
                    break;
                }
            }

            int total = sortedReviewCounts.size();
            reviewPercentage = (int) Math.round(((double) reviewRank / total) * 100);
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

        // 추천 작품
        String recommendedArtwork = null;
        String recommendedArtist = null;
        String recommendedImg = null;

        // 사용자 선호 작품이 있을 경우, GPT에게 추천 요청
        if (favoriteName != null && !favoriteName.isBlank()) {
            Prompt prompt = WrappedGptPromptProvider.buildPromptForRecommendation(wrappedRecommendationDtoList, favoriteName);
            ChatResponse chatResponse = chatClient.call(prompt);

            if (chatResponse != null && chatResponse.getResult() != null && chatResponse.getResult().getOutput() != null) {
                String gptRecommendArtwork = chatResponse.getResult().getOutput().getContent().trim();
                System.out.println(gptRecommendArtwork);

                for (WrappedRecommendationDto dto : wrappedRecommendationDtoList) {
                    if (dto.getArtwork().equalsIgnoreCase(gptRecommendArtwork)) {
                        recommendedArtwork = dto.getArtwork();
                        recommendedArtist = dto.getArtist();
                        recommendedImg = dto.getImageUrl();
                        break;
                    }
                }
            }
        } else {
            // 사용자 선호 작품이 없는 경우, 랜덤하게 추천
            WrappedRecommendationDto randomPick = wrappedRecommendationDtoList.get(
                    (int) (Math.random() * wrappedRecommendationDtoList.size())
            );
            recommendedArtwork = randomPick.getArtwork();
            recommendedArtist = randomPick.getArtist();
            recommendedImg = randomPick.getImageUrl();
        }

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


