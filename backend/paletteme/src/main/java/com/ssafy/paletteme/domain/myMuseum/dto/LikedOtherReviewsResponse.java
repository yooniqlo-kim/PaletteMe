package com.ssafy.paletteme.domain.myMuseum.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikedOtherReviewsResponse {
    String nickaname;
    int reviewId;
    int likeCnt;
    String content;
    LocalDateTime createdAt;

    @QueryProjection
    public LikedOtherReviewsResponse(String nickname, int reviewId, int likeCnt, String content, LocalDateTime createdAt) {
        this.nickaname = nickname;
        this.reviewId = reviewId;
        this.likeCnt = likeCnt;
        this.content = content;
        this.createdAt = createdAt;
    }

}
