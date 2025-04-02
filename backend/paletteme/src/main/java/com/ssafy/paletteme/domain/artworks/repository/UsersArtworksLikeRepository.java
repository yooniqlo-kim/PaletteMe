package com.ssafy.paletteme.domain.artworks.repository;

import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import com.ssafy.paletteme.domain.artworks.entity.UsersArtworksLike;
import com.ssafy.paletteme.domain.users.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersArtworksLikeRepository extends JpaRepository<UsersArtworksLike, String> {
    boolean existsByUserAndArtwork(Users user, Artworks artwork);
    Optional<UsersArtworksLike> findByUserAndArtwork(Users user, Artworks artwork);

}
