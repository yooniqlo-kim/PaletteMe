package com.ssafy.paletteme.domain.reviews.repository;

import com.ssafy.paletteme.domain.reviews.dto.ReviewSummaryResponse;
import com.ssafy.paletteme.domain.reviews.dto.ReviewsWithArtworkResponses;

import java.util.List;

public interface ReviewsRepositoryCustom {
    ReviewsWithArtworkResponses getReviewsWithArtworkResponses(int reviewId);
    List<ReviewSummaryResponse> findReviewsWithPaging(String artworkId, Integer cursor, int size, int userId);
}
