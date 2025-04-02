package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.myMuseum.dto.LikedCollectionResponse;

import java.util.List;

public interface LikedCollectionService {

    List<LikedCollectionResponse> getLikedCollection(int userId, Integer cursor, int size);
}
