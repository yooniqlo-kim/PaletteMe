package com.ssafy.paletteme.domain.artworks.service;

import com.ssafy.paletteme.domain.artworks.dto.ArtworkDescriptionResponse;
import com.ssafy.paletteme.domain.artworks.dto.ArtworkDetailResponse;
import com.ssafy.paletteme.domain.artworks.entity.UsersArtworksLikeCnt;
import com.ssafy.paletteme.domain.artworks.repository.ArtworksRepository;
import com.ssafy.paletteme.domain.artworks.repository.UsersArtworksLikeCntRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArtworksService {
    private final ArtworksRepository artworksRepository;
    private final UsersArtworksLikeCntRepository usersArtworksLikeCntRepository;

    public ArtworkDetailResponse getArtworkDetail(String artworkId) {
        // 작품 정보 불러오기
        ArtworkDetailResponse artworkDetailResponse = artworksRepository.findArtworkDetail(artworkId);

        // 작품 좋아요 수 불러오기
        UsersArtworksLikeCnt usersArtworksLikeCnt = usersArtworksLikeCntRepository.findByArtworkId(artworkId)
                .orElse(new UsersArtworksLikeCnt());
        artworkDetailResponse.updateLike(usersArtworksLikeCnt.getLikeCnt());

        return artworkDetailResponse;
    }

    public ArtworkDescriptionResponse getArtworkDescription(String artworkId) {
        // GPT 프롬프팅 통해서 정형화된 형태의 데이터 얻어오기

        ArtworkDescriptionResponse artworkDescriptionResponse = ArtworkDescriptionResponse.of("MJ의 설명!");
        return artworkDescriptionResponse;
    }

}
