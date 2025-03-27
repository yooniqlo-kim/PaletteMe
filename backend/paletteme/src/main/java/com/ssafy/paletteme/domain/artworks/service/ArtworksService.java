package com.ssafy.paletteme.domain.artworks.service;

import com.ssafy.paletteme.domain.artworks.dto.ArtworkDetailResponse;
import com.ssafy.paletteme.domain.artworks.repository.ArtworksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArtworksService {
    private final ArtworksRepository artworksRepository;

    public ArtworkDetailResponse getArtworkDetail(String artworkId) {
        // 작품의 좋아요 수는 불러오지 않음. 불러오는 것까지 하기!
        ArtworkDetailResponse artworkDetailResponse = artworksRepository.findArtworkDetail(artworkId);
        return artworkDetailResponse;
    }
}
