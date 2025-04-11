package com.ssafy.paletteme.domain.reviews.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewSummaryResponse {
    private int reviewId;
    private String nickname;
    private String userImg;
    private String createdAt;
    private String content;
    private int reviewLike;
    private Boolean isLiked;

    @QueryProjection
    public ReviewSummaryResponse(int reviewId, String nickname, String userImg,
                                 String createdAt, String content, int reviewLike, Boolean isLiked) {
        this.reviewId = reviewId;
        this.nickname = nickname;
        this.userImg = userImg;
        this.createdAt = createdAt;
        this.content = content;
        this.reviewLike = reviewLike;
        this.isLiked = isLiked;
    }

}
