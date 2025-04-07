package com.ssafy.paletteme.domain.ranking.repository;

import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RankingRepository extends JpaRepository<Artworks, String>, RankingRepositoryCustom {
    // JpaRepository의 기본 메서드와 커스텀 메서드(findTop10Ranking)를 함께 사용할 수 있습니다.
}
