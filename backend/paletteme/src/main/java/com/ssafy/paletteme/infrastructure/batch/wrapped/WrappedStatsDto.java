package com.ssafy.paletteme.infrastructure.batch.wrapped;

import com.ssafy.paletteme.domain.wrapped.entity.Wrapped;
import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class WrappedStatsDto {
    private Integer userId;

    // 최애 화가
    private String artistName;

    // 감상문 랭킹
    private int reviewRank;
    private int reviewPercentage;
    private int reviewCnt;

    // 최애 작품
    private String favoriteName;
    private String favoriteArtist;
    private String favoriteImg;

    // 추천 작품
    private String recommendedArtwork;
    private String recommendedArtist;
    private String recommendedImg;

    @Builder
    public WrappedStatsDto(Integer userId, String artistName,
                           int reviewRank, int reviewPercentage, int reviewCnt,
                           String favoriteName, String favoriteArtist, String favoriteImg,
                           String recommendedArtwork, String recommendedArtist, String recommendedImg) {
        this.userId = userId;
        this.artistName = artistName;
        this.reviewRank = reviewRank;
        this.reviewPercentage = reviewPercentage;
        this.reviewCnt = reviewCnt;
        this.favoriteName = favoriteName;
        this.favoriteArtist = favoriteArtist;
        this.favoriteImg = favoriteImg;
        this.recommendedArtwork = recommendedArtwork;
        this.recommendedArtist = recommendedArtist;
        this.recommendedImg = recommendedImg;
    }

    public Wrapped toEntity() {
        return Wrapped.builder()
                .userId(this.userId)
                .artistName(this.artistName)
                .reviewRank(this.reviewRank)
                .reviewPercentage(this.reviewPercentage)
                .reviewCnt(this.reviewCnt)
                .favoriteName(this.favoriteName)
                .favoriteArtist(this.favoriteArtist)
                .favoriteImg(this.favoriteImg)
                .recommendedArtwork(this.recommendedArtwork)
                .recommendedArtist(this.recommendedArtist)
                .recommendedImg(this.recommendedImg)
                .build();
    }
}
