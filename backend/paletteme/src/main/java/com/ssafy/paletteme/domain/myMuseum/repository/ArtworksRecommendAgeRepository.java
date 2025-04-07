package com.ssafy.paletteme.domain.myMuseum.repository;

import com.ssafy.paletteme.domain.myMuseum.entity.ArtworksRecommendAge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtworksRecommendAgeRepository extends JpaRepository<ArtworksRecommendAge, Long> {

    @Query(value = "SELECT artwork_id FROM artworks_recommend_age WHERE age_group = :ageGroup ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<String> findRandomArtworkIdsByAgeGroup(@Param("ageGroup") int ageGroup, @Param("limit") int limit);

}
