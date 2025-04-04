package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.myMuseum.dto.LikedOtherReviewsResponse;
import com.ssafy.paletteme.domain.myMuseum.exception.MyReviewError;
import com.ssafy.paletteme.domain.myMuseum.exception.MyReviewException;
import com.ssafy.paletteme.domain.myMuseum.repository.MyReviewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikedOtherReviewsServiceImpl implements LikedOtherReviewsService {

    private final MyReviewsRepository  myReviewsRepository;

    @Override
    public List<LikedOtherReviewsResponse> getLikedOtherReviews(int userId, Integer cursor, int size) {
        List<LikedOtherReviewsResponse> responses = myReviewsRepository.getLikedOtherReviews(userId, cursor, size);

        if(responses.isEmpty()){
            throw new MyReviewException(MyReviewError.EMPTY_MY_REVIEW);
        }

        return responses;
    }
}
