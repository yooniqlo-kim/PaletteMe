package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.myMuseum.dto.ReviewCalendarResponse;
import com.ssafy.paletteme.domain.myMuseum.exception.ReviewCalendarError;
import com.ssafy.paletteme.domain.myMuseum.exception.ReviewCalendarException;
import com.ssafy.paletteme.domain.myMuseum.repository.ReviewCalendarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewCalendarServiceImpl implements ReviewCalendarService {
    private final ReviewCalendarRepository reviewCalendarRepository;


    @Override
    public List<ReviewCalendarResponse> getReviewCalendar(int userId, int year, int month) {
        try {
            List<ReviewCalendarResponse> response = reviewCalendarRepository.findReviewsByUserAndMonth(userId, year, month);

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
