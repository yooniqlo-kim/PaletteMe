package com.ssafy.paletteme.domain.reviews.service;

import com.ssafy.paletteme.common.redis.RedisService;
import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import com.ssafy.paletteme.domain.artworks.repository.ArtworksRepository;
import com.ssafy.paletteme.domain.reviews.dto.*;
import com.ssafy.paletteme.domain.reviews.entity.Reviews;
import com.ssafy.paletteme.domain.reviews.entity.UsersReviewLike;
import com.ssafy.paletteme.domain.reviews.exception.ReviewsError;
import com.ssafy.paletteme.domain.reviews.exception.ReviewsException;
import com.ssafy.paletteme.domain.reviews.repository.ReviewsRepository;
import com.ssafy.paletteme.domain.reviews.repository.UsersReviewLikeRepository;
import com.ssafy.paletteme.domain.users.dto.UserStats;
import com.ssafy.paletteme.domain.users.entity.Users;
import com.ssafy.paletteme.domain.users.repository.UsersGradeRepository;
import com.ssafy.paletteme.domain.users.repository.UsersRepository;
import com.ssafy.paletteme.domain.users.utils.UsersGradeUpdater;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewsService {
    private static final Logger log = LoggerFactory.getLogger(ReviewsService.class);

    private final UsersRepository usersRepository;
    private final ReviewsRepository reviewsRepository;
    private final ArtworksRepository  artworksRepository;
    private final UsersReviewLikeRepository  usersReviewLikeRepository;
    private final RedisService redisService;
    private final UsersGradeRepository usersGradeRepository;
    private final UsersGradeUpdater usersGradeUpdater;

    @Transactional
    public ReviewWriteResponse writeReview(long userId, ReviewsWriteRequest reviewsWriteRequest) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new ReviewsException(ReviewsError.USER_NOT_FOUND));

        Artworks artworks = artworksRepository.findById(reviewsWriteRequest.getArtworkId())
                .orElseThrow(() -> new ReviewsException(ReviewsError.ARTWORKS_NOT_FOUND));

        Reviews reviews = reviewsWriteRequest.toEntity(user, artworks);

        reviews = reviewsRepository.save(reviews);

        Boolean isLiked = usersReviewLikeRepository.existsByUserAndReview(user, reviews);


        // 레디스 출력 -> 등급 변경 -> 등급 확인 -> 레디스 입력
        UserStats userStats = redisService.getUserStats(user.getUserId());
        userStats.incrementReviewCount();
        usersGradeUpdater.updateUserGradeIfNeeded(userStats);
        redisService.saveUserStats(userStats);

        return ReviewWriteResponse.fromEntity(user, reviews, isLiked);
    }

    @Transactional(readOnly = true)
    public ReviewsWithArtworkResponses  getReviewsWithArtwork(long userId, int reviewId) {
        ReviewsWithArtworkResponses reviewsWithArtworkResponses = reviewsRepository.getReviewsWithArtworkResponses(reviewId);

        // 좋아요 눌렀는지 확인하기
        Reviews reviews = reviewsRepository.findById(reviewId)
                .orElseThrow(() -> new ReviewsException(ReviewsError.REVIEW_NOT_FOUND));
        Users users = usersRepository.findById(userId)
                .orElseThrow(() -> new ReviewsException(ReviewsError.USER_NOT_FOUND));
        boolean isLiked = usersReviewLikeRepository.existsByUserAndReview(users, reviews);
        reviewsWithArtworkResponses.updateIsLiked(isLiked);

        return reviewsWithArtworkResponses;
    }

    @Transactional
    public ReviewsEditResponse editReview(int userId,int reviewId, ReviewsEditRequest reviewsEditRequest) {
        Reviews reviews = reviewsRepository.findById(reviewId)
                .orElseThrow(() -> new ReviewsException(ReviewsError.REVIEW_NOT_FOUND));

        if(userId != reviews.getUser().getUserId()){
            throw new ReviewsException(ReviewsError.REVIEW_EDIT_UNAUTHORIZED);
        }

        reviews.updateContent(
                reviewsEditRequest.getContent(),
                reviewsEditRequest.getIsPublic()
        );

        Users user = usersRepository.findById((long)userId)
                .orElseThrow(() -> new ReviewsException(ReviewsError.USER_NOT_FOUND));

        Boolean isLiked = usersReviewLikeRepository.existsByUserAndReview(user, reviews);


        return ReviewsEditResponse.fromEntity(reviews, isLiked);
    }

    @Transactional
    public void deleteReview(int userId,int reviewId) {
        Reviews reviews = reviewsRepository.findById(reviewId)
                .orElseThrow(() -> new ReviewsException(ReviewsError.REVIEW_NOT_FOUND));

        if(userId != reviews.getUser().getUserId()){
            throw new ReviewsException(ReviewsError.REVIEW_EDIT_UNAUTHORIZED);
        }

        reviewsRepository.delete(reviews);
    }

    @Transactional(readOnly = true)
    public ReviewListResponse getReviewsCursorPaging(int userId, String artworkId, Integer cursor, int size) {
        List<ReviewSummaryResponse> reviewSummaryResponseList = reviewsRepository.findReviewsWithPaging(artworkId, cursor, size, userId);

        // 처음 호출 시, 사용자의 데이터 반환하기
        if (cursor == null || cursor == 0) {
            ReviewSummaryResponse myReview = reviewsRepository.findMyReview(userId, artworkId);
            if (myReview != null) {
                reviewSummaryResponseList.add(0, myReview);
            }
        }

        return ReviewListResponse.of(reviewSummaryResponseList);
    }

    @Transactional
    public void likeReview(int userId, int reviewId) {
        Users user = usersRepository.findById((long) userId)
                .orElseThrow(() -> new ReviewsException(ReviewsError.USER_NOT_FOUND));

        Reviews review = reviewsRepository.findById(reviewId)
                .orElseThrow(() -> new ReviewsException(ReviewsError.REVIEW_NOT_FOUND));

        // 이미 좋아요 한 경우
        if (usersReviewLikeRepository.existsByUserAndReview(user, review)) {
            throw new ReviewsException(ReviewsError.REVIEW_ALREADY_LIKED);
        }

        // 좋아요 테이블에 추가
        UsersReviewLike usersReviewLike = UsersReviewLike.of(user, review);
        usersReviewLikeRepository.save(usersReviewLike);

        // 리뷰의 좋아요 개수 추가
        review.increaseLikeCnt();
    }

    @Transactional
    public void cancelLikeReview(int userId, int reviewId) {
        Users user = usersRepository.findById((long) userId)
                .orElseThrow(() -> new ReviewsException(ReviewsError.USER_NOT_FOUND));

        Reviews review = reviewsRepository.findById(reviewId)
                .orElse(null);

        // 리뷰는 삭제됐는데, 리뷰 좋아요만 남은 경우에 대한 처리
        if(review == null){
            log.info("리뷰는 삭제되었지만 좋아요 기록이 남아 있어 삭제 처리됨 - reviewId: {}", reviewId);
            UsersReviewLike like = usersReviewLikeRepository
                    .findByUser_UserIdAndReview_ReviewId(user.getUserId(), reviewId)
                    .orElseThrow(() -> new ReviewsException(ReviewsError.REVIEW_NOT_LIKED));

            usersReviewLikeRepository.delete(like);
            return;
        }

        // 좋아요한 기록이 있는지 확인
        UsersReviewLike usersReviewLike = usersReviewLikeRepository.findByUserAndReview(user, review)
                .orElseThrow(() -> new ReviewsException(ReviewsError.REVIEW_NOT_LIKED));

        // 좋아요 테이블에서 삭제
        usersReviewLikeRepository.delete(usersReviewLike);

        // 리뷰 좋아요 수 감소
        review.decreaseLikeCnt();
    }

}
