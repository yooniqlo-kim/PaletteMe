package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.myMuseum.dto.ReviewCalendarResponse;

import java.util.List;

public interface ReviewCalendarService {
    List<ReviewCalendarResponse> getReviewCalendar(int userId, int year, int month);
}
