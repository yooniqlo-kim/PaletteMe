package com.ssafy.paletteme.domain.reviews.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewsWithArtworkResponses {
    private String imgUrl;
    private String museumName;
    private String title;
    private String artist;
    private String userImg;
    private String createdAt;
    private String content;
    private int reviewLike;
    private Boolean isLiked;

    @QueryProjection
    public ReviewsWithArtworkResponses(String imgUrl, String museumName, String title, String artist,
                                       String userImg, String createdAt, String content, int reviewLike) {
        this.imgUrl = imgUrl;
        this.museumName = museumName;
        this.title = title;
        this.artist = artist;
        this.userImg = userImg;
        this.createdAt = createdAt;
        this.content = content;
        this.reviewLike = reviewLike;
    }

    public void updateIsLiked(boolean isLiked) {
        this.isLiked = isLiked;
    }

}
