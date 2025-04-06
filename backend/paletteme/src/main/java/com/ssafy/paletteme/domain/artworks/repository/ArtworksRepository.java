package com.ssafy.paletteme.domain.artworks.repository;

import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ArtworksRepository extends JpaRepository<Artworks, String>, ArtworksRepositoryCustom{
    @Query("SELECT COUNT(a) FROM Artworks a WHERE a.color = :color AND a.artworkId NOT IN :excludedIds")
    int countByColorAndIdNotIn(@Param("color") String color, @Param("excludedIds") List<String> excludedIds);

    @Query("SELECT a FROM Artworks a WHERE a.color = :color AND a.artworkId NOT IN :excludedIds")
    List<Artworks> findByColorAndIdNotIn(@Param("color") String color, @Param("excludedIds") List<String> excludedIds, Pageable pageable);
}
