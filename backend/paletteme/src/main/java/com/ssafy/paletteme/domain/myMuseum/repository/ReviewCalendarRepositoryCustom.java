package com.ssafy.paletteme.domain.myMuseum.repository;

import com.ssafy.paletteme.domain.myMuseum.dto.ReviewCalendarResponse;

import java.util.List;

public interface ReviewCalendarRepositoryCustom {
    public List<ReviewCalendarResponse> findReviewsByUserAndMonth(int userId, int year, int month);
}
