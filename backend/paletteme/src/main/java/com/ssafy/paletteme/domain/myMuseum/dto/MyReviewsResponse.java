package com.ssafy.paletteme.domain.myMuseum.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MyReviewsResponse {
    int reviewId;
    int likeCnt;
    String content;
    LocalDateTime createdAt;
    String artworkId;
    String originalTitle;
    String originalArtist;
    String imageUrl;
    Boolean isLiked;

    @QueryProjection
    public MyReviewsResponse(int reviewId, int likeCnt, String content, LocalDateTime createdAt,
                             String artworkId,String originalTitle, String originalArtist, String imageUrl, Boolean isLiked) {
        this.reviewId = reviewId;
        this.likeCnt = likeCnt;
        this.content = content;
        this.createdAt = createdAt;
        this.artworkId = artworkId;
        this.originalTitle = originalTitle;
        this.originalArtist = originalArtist;
        this.imageUrl = imageUrl;
        this.isLiked = isLiked;
    }
}
