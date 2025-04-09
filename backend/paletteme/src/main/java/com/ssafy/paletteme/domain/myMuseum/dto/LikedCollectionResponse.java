package com.ssafy.paletteme.domain.myMuseum.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikedCollectionResponse {
    int userArtworkLikeId;
    String artworkId;
    String imgUrl;

    @QueryProjection
    public LikedCollectionResponse(int userArtworkLikeId, String artworkId, String imgUrl) {
        this.userArtworkLikeId = userArtworkLikeId;
        this.artworkId = artworkId;
        this.imgUrl = imgUrl;
    }
}
