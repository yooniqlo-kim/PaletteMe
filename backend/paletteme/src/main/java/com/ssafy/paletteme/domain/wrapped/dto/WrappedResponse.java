package com.ssafy.paletteme.domain.wrapped.dto;

import com.ssafy.paletteme.domain.wrapped.entity.Wrapped;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class WrappedResponse {
    private String artistName;

    private int reviewRank;
    private int reviewPercentage;
    private int reviewCnt;

    private String favoriteName;
    private String favoriteArtist;
    private String favoriteImg;

    private String recommendedArtwork;
    private String recommendedArtist;
    private String recommendedImg;

    public static WrappedResponse of(Wrapped wrapped) {
        if(wrapped == null){
            return null;
        }

        return WrappedResponse.builder()
                .artistName(wrapped.getArtistName())
                .reviewRank(wrapped.getReviewRank())
                .reviewPercentage(wrapped.getReviewPercentage())
                .reviewCnt(wrapped.getReviewCnt())
                .favoriteName(wrapped.getFavoriteName())
                .favoriteArtist(wrapped.getFavoriteArtist())
                .favoriteImg(wrapped.getFavoriteImg())
                .recommendedArtwork(wrapped.getRecommendedArtwork())
                .recommendedArtist(wrapped.getRecommendedArtist())
                .recommendedImg(wrapped.getRecommendedImg())
                .build();
    }

}
