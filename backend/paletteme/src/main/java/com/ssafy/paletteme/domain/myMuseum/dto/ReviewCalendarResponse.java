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
    private String artworkId;
    private String content;

    @QueryProjection
    public ReviewCalendarResponse(int reviewId, LocalDateTime createdAt, String artworkId, String content) {
        this.reviewId = reviewId;
        this.createdAt = createdAt;
        this.artworkId = artworkId;
        this.content = content;
    }
}
