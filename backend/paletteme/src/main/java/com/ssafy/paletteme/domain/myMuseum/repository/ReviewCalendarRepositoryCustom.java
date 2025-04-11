package com.ssafy.paletteme.domain.myMuseum.repository;

import com.ssafy.paletteme.domain.myMuseum.dto.MonthlyReviewResponse;
import com.ssafy.paletteme.domain.myMuseum.dto.WeeklyReviewResponse;

import java.time.LocalDate;
import java.util.List;

public interface ReviewCalendarRepositoryCustom {
    public List<MonthlyReviewResponse> getMonthlyReviewCalendar(int userId, int year, int month);

    public List<WeeklyReviewResponse> getWeeklyReviewCalendar(int userId, LocalDate startDate, LocalDate endDate);
}
