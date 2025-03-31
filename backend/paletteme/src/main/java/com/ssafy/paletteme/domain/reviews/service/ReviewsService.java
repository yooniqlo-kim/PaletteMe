package com.ssafy.paletteme.domain.reviews.service;

import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import com.ssafy.paletteme.domain.artworks.repository.ArtworksRepository;
import com.ssafy.paletteme.domain.reviews.dto.*;
import com.ssafy.paletteme.domain.reviews.entity.Reviews;
import com.ssafy.paletteme.domain.reviews.exception.ReviewsError;
import com.ssafy.paletteme.domain.reviews.exception.ReviewsException;
import com.ssafy.paletteme.domain.reviews.repository.ReviewsRepository;
import com.ssafy.paletteme.domain.users.entity.Users;
import com.ssafy.paletteme.domain.users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewsService {
    private final UsersRepository usersRepository;
    private final ReviewsRepository reviewsRepository;
    private final ArtworksRepository  artworksRepository;

    @Transactional
    public void writeReview(long userId, ReviewsWriteRequest reviewsWriteRequest) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new ReviewsException(ReviewsError.USER_NOT_FOUND));

        Artworks artworks = artworksRepository.findById(reviewsWriteRequest.getArtworkId())
                .orElseThrow(() -> new ReviewsException(ReviewsError.ARTWORKS_NOT_FOUND));

        Reviews reviews = reviewsWriteRequest.toEntity(user, artworks);
        reviewsRepository.save(reviews);
    }

    @Transactional(readOnly = true)
    public ReviewsWithArtworkResponses  getReviewsWithArtwork(long userId, int reviewId) {
        ReviewsWithArtworkResponses reviewsWithArtworkResponses = reviewsRepository.getReviewsWithArtworkResponses(reviewId);
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

        return ReviewsEditResponse.fromEntity(reviews);
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
    public ReviewListResponse getReviewsCursorPaging(String artworkId, Integer cursor, int size) {
        List<ReviewSummaryResponse> reviewSummaryResponseList = reviewsRepository.findReviewsWithPaging(artworkId, cursor, size);

        return ReviewListResponse.of(reviewSummaryResponseList);
    }
}
