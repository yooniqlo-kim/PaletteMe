package com.ssafy.paletteme.domain.artworks.repository;

import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import com.ssafy.paletteme.domain.artworks.entity.UsersArtworksBookmark;
import com.ssafy.paletteme.domain.users.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersArtworksBookmarkRepository extends JpaRepository<UsersArtworksBookmark, Integer> {
    boolean existsByUserAndArtwork(Users user, Artworks  artwork);

    Optional<UsersArtworksBookmark> findByUserAndArtwork(Users user, Artworks artwork);

    Optional<UsersArtworksBookmark> findByUser_UserIdAndArtwork_ArtworkId(int userId, String artworkId);
}
