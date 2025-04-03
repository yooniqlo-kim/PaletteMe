package com.ssafy.paletteme.domain.myMuseum.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewCalendarResponse {
    private int reviewId;
    private LocalDateTime createdAt;
    private String imgUrl;

    @QueryProjection
    public ReviewCalendarResponse(int reviewId, LocalDateTime createdAt, String imgUrl) {
        this.reviewId = reviewId;
        this.createdAt = createdAt;
        this.imgUrl = imgUrl;
    }
}
