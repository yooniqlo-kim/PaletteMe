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
    private Boolean isLiked;

    private ReviewsEditResponse(String content, Boolean isPublic, Boolean isLiked) {
        this.content = content;
        this.isPublic = isPublic;
        this.isLiked = isLiked;
    }

    public static ReviewsEditResponse fromEntity(Reviews reviews, Boolean isLiked) {
        return new ReviewsEditResponse(reviews.getContent(), reviews.getIsPublic(), isLiked);
    }

}
