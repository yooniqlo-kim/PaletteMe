package com.ssafy.paletteme.domain.artworks.repository;

import java.util.List;

public interface UsersArtworksLikeRepositoryCustom {
    List<String> findLikedArtworkIdsByUserIdAndArtworkIds(int userId, List<String> artworkId);
    List<Integer> findLikedArtworkIdsByUserId(int userId);
}
