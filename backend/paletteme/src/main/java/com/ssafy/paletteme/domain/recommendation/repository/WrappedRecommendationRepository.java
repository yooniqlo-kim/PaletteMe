package com.ssafy.paletteme.domain.recommendation.repository;

import com.ssafy.paletteme.domain.recommendation.entity.WrappedRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WrappedRecommendationRepository extends JpaRepository<WrappedRecommendation, Integer> {
    List<WrappedRecommendation> findAll();  // 전체 데이터 조회, 없으면 0건.
}
