package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.myMuseum.dto.MonthlyReviewResponse;
import com.ssafy.paletteme.domain.myMuseum.dto.WeeklyReviewResponse;

import java.time.LocalDate;
import java.util.List;

public interface ReviewCalendarService {
    List<MonthlyReviewResponse> getMonthlyReviewCalendar(int userId, int year, int month);

    List<WeeklyReviewResponse> getWeeklyReviewCalendar(int userId, LocalDate year, LocalDate month);
}
