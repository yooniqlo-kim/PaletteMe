package com.ssafy.paletteme.domain.reviews.repository;

import com.ssafy.paletteme.domain.reviews.entity.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewsRepository extends JpaRepository<Reviews, Integer>, ReviewsRepositoryCustom {
}
