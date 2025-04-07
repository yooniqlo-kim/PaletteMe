package com.ssafy.paletteme.domain.artworks.repository;

import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import com.ssafy.paletteme.domain.artworks.entity.UsersArtworksLike;
import com.ssafy.paletteme.domain.users.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface UsersArtworksLikeRepository extends JpaRepository<UsersArtworksLike, String>, UsersArtworksLikeRepositoryCustom {
    boolean existsByUserAndArtwork(Users user, Artworks artwork);
    Optional<UsersArtworksLike> findByUserAndArtwork(Users user, Artworks artwork);
    List<UsersArtworksLike> findByUserUserIdAndArtworkArtworkIdIn(int userId, List<String> artworkIds);
    int countByUser(Users user);
}
