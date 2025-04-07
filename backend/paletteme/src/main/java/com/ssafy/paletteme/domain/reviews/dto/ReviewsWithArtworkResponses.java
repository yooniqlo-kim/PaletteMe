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
    private String nickname;
    private String createdAt;
    private String content;
    private int reviewLike;
    private Boolean isLiked;
    private Boolean isPublic;
    private String artworkId;

    @QueryProjection
    public ReviewsWithArtworkResponses(String imgUrl, String museumName, String title, String artist,
                                       String userImg, String nickname, String createdAt, String content, int reviewLike,
                                       Boolean isPublic, String artworkId) {
        this.imgUrl = imgUrl;
        this.museumName = museumName;
        this.title = title;
        this.artist = artist;
        this.userImg = userImg;
        this.nickname = nickname;
        this.createdAt = createdAt;
        this.content = content;
        this.reviewLike = reviewLike;
        this.isPublic = isPublic;
        this.artworkId = artworkId;
    }

    public void updateIsLiked(boolean isLiked) {
        this.isLiked = isLiked;
    }

}
