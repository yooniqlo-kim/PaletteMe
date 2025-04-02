package com.ssafy.paletteme.domain.reviews.dto;

import com.ssafy.paletteme.domain.reviews.entity.Reviews;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewsEditResponse {
    private String content;
    private Boolean isPublic = true;

    private ReviewsEditResponse(String content, Boolean isPublic) {
        this.content = content;
        this.isPublic = isPublic;
    }

    public static ReviewsEditResponse fromEntity(Reviews reviews){
        return new ReviewsEditResponse(reviews.getContent(), reviews.getIsPublic());
    }
}
