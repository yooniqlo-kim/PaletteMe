package com.ssafy.paletteme.domain.artworks.repository;

import com.ssafy.paletteme.domain.artworks.entity.UsersArtworksLikeCnt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersArtworksLikeCntRepository extends JpaRepository<UsersArtworksLikeCnt, Long> {
    Optional<UsersArtworksLikeCnt> findByArtworkId(String artworkId);
}