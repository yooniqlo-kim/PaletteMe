package com.ssafy.paletteme.domain.reviews.repository;


import com.ssafy.paletteme.domain.reviews.entity.Reviews;
import com.ssafy.paletteme.domain.users.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewsRepository extends JpaRepository<Reviews, Integer>, ReviewsRepositoryCustom {
    Optional<Reviews> findById(int reviewId);
}
