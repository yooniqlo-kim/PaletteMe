
package com.ssafy.paletteme.domain.myMuseum.repository;

import com.ssafy.paletteme.domain.myMuseum.entity.UsersRecommendHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UsersRecommendHistoryRepository extends JpaRepository<UsersRecommendHistory, Integer> {
    @Query("SELECT urh.artworkId " +
            "FROM UsersRecommendHistory urh " +
            "WHERE urh.userId = :userId AND urh.recommendedAt >= :since")
    List<String> findArtworkIds(@Param("userId") int userId,
                                @Param("since") LocalDateTime since);
}

