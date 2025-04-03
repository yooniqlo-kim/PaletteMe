package com.ssafy.paletteme.domain.reviews.dto;

import com.ssafy.paletteme.domain.reviews.entity.Reviews;
import com.ssafy.paletteme.domain.users.entity.Users;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewWriteResponse {
    private int reviewId;
    private String nickname;
    private String userImg;
    private LocalDate createdAt;
    private String content;
    private int reviewLike;
    private boolean isLiked;

    @Builder
    private ReviewWriteResponse(int reviewId, String nickname, String userImg,
                                LocalDate createdAt, String content, int reviewLike, boolean isLiked) {
        this.reviewId = reviewId;
        this.nickname = nickname;
        this.userImg = userImg;
        this.createdAt = createdAt;
        this.content = content;
        this.reviewLike = reviewLike;
        this.isLiked = isLiked;
    }

    public static ReviewWriteResponse fromEntity(Users user, Reviews reviews, Boolean isLiked) {
        ReviewWriteResponse response = ReviewWriteResponse.builder()
                .reviewId(reviews.getReviewId())
                .nickname(user.getNickname())
                .userImg(user.getS3Url())
                .createdAt(reviews.getUpdatedAt().toLocalDate())
                .content(reviews.getContent())
                .reviewLike(reviews.getLikeCnt())
                .isLiked(isLiked)
                .build();
        return response;
    }

}
