package com.ssafy.paletteme.domain.myMuseum.repository;

import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikedCollectionRepository extends JpaRepository<Artworks, String>, LikedCollectionRepositoryCustom {
}
