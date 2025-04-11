package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.myMuseum.dto.LikedOtherReviewsResponse;

import java.util.List;

public interface LikedOtherReviewsService {
    List<LikedOtherReviewsResponse> getLikedOtherReviews(int userId, Integer cursor, int size);
}
