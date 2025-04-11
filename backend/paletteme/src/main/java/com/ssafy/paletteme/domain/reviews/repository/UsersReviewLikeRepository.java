package com.ssafy.paletteme.domain.reviews.repository;

import com.ssafy.paletteme.domain.reviews.entity.Reviews;
import com.ssafy.paletteme.domain.reviews.entity.UsersReviewLike;
import com.ssafy.paletteme.domain.users.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersReviewLikeRepository extends JpaRepository<UsersReviewLike, Integer> {
    boolean existsByUserAndReview(Users user, Reviews review);

    Optional<UsersReviewLike> findByUserAndReview(Users user, Reviews review);

    Optional<UsersReviewLike> findByUser_UserIdAndReview_ReviewId(Integer userId, Integer reviewId);
}
