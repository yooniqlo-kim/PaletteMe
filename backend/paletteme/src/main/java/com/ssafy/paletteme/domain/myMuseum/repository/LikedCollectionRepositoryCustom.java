package com.ssafy.paletteme.domain.myMuseum.repository;

import com.ssafy.paletteme.domain.myMuseum.dto.LikedCollectionResponse;

import java.util.List;

public interface LikedCollectionRepositoryCustom {

    List<LikedCollectionResponse> findLikedArtworksByUserId(int userId, int cursor, int size);
}
