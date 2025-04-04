package com.ssafy.paletteme.domain.users.repository;

import com.ssafy.paletteme.domain.users.entity.UserArtworkRecommend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserArtworkRecommendRepository extends JpaRepository<UserArtworkRecommend, Integer> {
}
