package com.ssafy.paletteme.domain.artworks.controller;

import com.ssafy.paletteme.common.response.ApiResponse;
import com.ssafy.paletteme.domain.artworks.dto.ArtworkDetailResponse;
import com.ssafy.paletteme.domain.artworks.service.ArtworksService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/artworks")
@RequiredArgsConstructor
public class ArtworksController {
    private final ArtworksService artworkService;

    @GetMapping("/{artworkId}")
    public ApiResponse<ArtworkDetailResponse> getArtworkDetail(@PathVariable String artworkId) {
        ArtworkDetailResponse response = artworkService.getArtworkDetail(artworkId);
        return ApiResponse.success(response);
    }

}
