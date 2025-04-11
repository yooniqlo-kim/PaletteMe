package com.ssafy.paletteme.domain.myMuseum.repository;

import com.ssafy.paletteme.domain.myMuseum.dto.LikedOtherReviewsResponse;
import com.ssafy.paletteme.domain.myMuseum.dto.MyReviewsResponse;

import java.util.List;

public interface MyReviewsRepositoryCustom {

    List<MyReviewsResponse> getMyReviews(int userId, Integer cursor, int size);

    List<LikedOtherReviewsResponse> getLikedOtherReviews(int userId, Integer cursor, int size);
}
