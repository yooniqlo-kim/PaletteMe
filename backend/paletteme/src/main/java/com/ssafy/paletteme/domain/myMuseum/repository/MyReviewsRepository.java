package com.ssafy.paletteme.domain.myMuseum.repository;

import com.ssafy.paletteme.domain.reviews.entity.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyReviewsRepository extends JpaRepository<Reviews, Integer>, MyReviewsRepositoryCustom {
}
