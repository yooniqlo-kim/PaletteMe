package com.ssafy.paletteme.domain.reviews.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewsEditRequest {
    private String content;
    private Boolean isPublic = true;
}
