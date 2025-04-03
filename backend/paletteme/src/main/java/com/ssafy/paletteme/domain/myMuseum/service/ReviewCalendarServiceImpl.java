package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.myMuseum.dto.MonthlyReviewResponse;
import com.ssafy.paletteme.domain.myMuseum.dto.WeeklyReviewResponse;
import com.ssafy.paletteme.domain.myMuseum.exception.ReviewCalendarError;
import com.ssafy.paletteme.domain.myMuseum.exception.ReviewCalendarException;
import com.ssafy.paletteme.domain.myMuseum.repository.ReviewCalendarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewCalendarServiceImpl implements ReviewCalendarService {
    private final ReviewCalendarRepository reviewCalendarRepository;


    @Override
    public List<MonthlyReviewResponse> getMonthlyReviewCalendar(int userId, int year, int month) {
        try {
            List<MonthlyReviewResponse> response = reviewCalendarRepository.getMonthlyReviewCalendar(userId, year, month);

            if (response.isEmpty()) {
                throw new ReviewCalendarException(ReviewCalendarError.EMPTY_REVIEWS);
            }

            return response;

        } catch (ReviewCalendarException e) {
            throw e;

        } catch (Exception e) {
            throw new ReviewCalendarException(ReviewCalendarError.INTERNAL_ERROR);

        }
    }


    @Override
    public List<WeeklyReviewResponse> getWeeklyReviewCalendar(int userId, LocalDate startDate, LocalDate endDate) {
        try {
            List<WeeklyReviewResponse> response = reviewCalendarRepository.getWeeklyReviewCalendar(userId, startDate, endDate);

            if (response.isEmpty()) {
                throw new ReviewCalendarException(ReviewCalendarError.EMPTY_REVIEWS);
            }

            return response;

        } catch (ReviewCalendarException e) {
            throw e;

        } catch (Exception e) {
            throw new ReviewCalendarException(ReviewCalendarError.INTERNAL_ERROR);

        }
    }
}
