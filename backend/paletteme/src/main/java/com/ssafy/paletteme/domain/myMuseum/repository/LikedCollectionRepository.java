package com.ssafy.paletteme.domain.myMuseum.repository;

import com.ssafy.paletteme.domain.artworks.entity.UsersArtworksLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikedCollectionRepository extends JpaRepository<UsersArtworksLike, String>, LikedCollectionRepositoryCustom {
}
