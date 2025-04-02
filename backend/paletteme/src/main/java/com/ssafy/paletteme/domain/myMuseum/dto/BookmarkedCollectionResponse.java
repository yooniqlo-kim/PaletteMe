package com.ssafy.paletteme.domain.myMuseum.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BookmarkedCollectionResponse {
    int userArtworkBookmarkId;
    String artworkId;
    String imgUrl;

    @QueryProjection
    public BookmarkedCollectionResponse(int userArtworkBookmarkId, String artworkId, String imgUrl) {
        this.userArtworkBookmarkId = userArtworkBookmarkId;
        this.artworkId = artworkId;
        this.imgUrl = imgUrl;
    }
}
