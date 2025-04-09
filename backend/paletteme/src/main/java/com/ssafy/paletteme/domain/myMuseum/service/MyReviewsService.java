package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.myMuseum.dto.MyReviewsResponse;

import java.util.List;

public interface MyReviewsService {
    List<MyReviewsResponse> getMyReviews(int userId, Integer cursor, int size);
}
