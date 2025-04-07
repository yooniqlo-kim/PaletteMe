package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.myMuseum.dto.LikedOtherReviewsResponse;
import com.ssafy.paletteme.domain.myMuseum.exception.MyReviewError;
import com.ssafy.paletteme.domain.myMuseum.exception.MyReviewException;
import com.ssafy.paletteme.domain.myMuseum.repository.MyReviewsRepository;
import com.ssafy.paletteme.domain.users.entity.Users;
import com.ssafy.paletteme.domain.users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikedOtherReviewsServiceImpl implements LikedOtherReviewsService {

    private final MyReviewsRepository  myReviewsRepository;
    private final UsersRepository usersRepository;

    @Override
    public List<LikedOtherReviewsResponse> getLikedOtherReviews(int userId, Integer cursor, int size) {
        Users user = usersRepository.findById((long)userId)
                .orElseThrow(() -> new MyReviewException(MyReviewError.USER_NOT_FIND));

        List<LikedOtherReviewsResponse> responses = myReviewsRepository.getLikedOtherReviews(userId, cursor, size);

        if(responses.isEmpty()){
            throw new MyReviewException(MyReviewError.EMPTY_MY_REVIEW);
        }

        // 자기 좋아요로, 모두 동일한 s3Url이니까 querydsl사용하지 말고 직접 값을 넣어주기.
        String myProfileImageUrl = user.getS3Url();
        for (LikedOtherReviewsResponse response : responses) {
            response.updateUserImgUrl(myProfileImageUrl);
        }

        return responses;
    }
}
