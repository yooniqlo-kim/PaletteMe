package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.myMuseum.dto.MyReviewsResponse;
import com.ssafy.paletteme.domain.myMuseum.exception.MyReviewError;
import com.ssafy.paletteme.domain.myMuseum.exception.MyReviewException;
import com.ssafy.paletteme.domain.myMuseum.repository.MyReviewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyReviewsServiceImpl implements MyReviewsService {

    private final MyReviewsRepository myReviewsRepository;

    @Override
    public List<MyReviewsResponse> getMyReviews(int userId, Integer cursor, int size) {

        List<MyReviewsResponse> responses = myReviewsRepository.getMyReviews(userId, cursor, size);

        if(responses.isEmpty()){
            throw new MyReviewException(MyReviewError.EMPTY_MY_REVIEW);
        }

        return responses;
    }
}
