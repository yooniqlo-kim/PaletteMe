package com.ssafy.paletteme.domain.artworks.repository;

import com.ssafy.paletteme.domain.artworks.dto.ArtworkDetailResponse;

public interface ArtworksRepositoryCustom {
    ArtworkDetailResponse findArtworkDetail(String artworkId);
}
