package com.ssafy.paletteme.domain.artworks.repository;

import java.util.List;

public interface UsersArtworksLikeRepositoryCustom {
    List<String> findLikedArtworkIdsByUserIdAndArtworkIds(int userId, List<String> artworkId);
    List<Integer> findLikedArtistIdsByUserId(int userId);
    List<String> findLikedArtworkIdsByUserId(int userId);
    List<String> findArtworksLikedByUsersWhoLiked(List<String> likedArtworkIds, int userId, List<String> excludedArtworkIds);

}
