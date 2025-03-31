package com.ssafy.paletteme.domain.artworks.controller;

import com.ssafy.paletteme.common.response.ApiResponse;
import com.ssafy.paletteme.domain.artworks.dto.ArtworkDescriptionResponse;
import com.ssafy.paletteme.domain.artworks.dto.ArtworkDetailResponse;
import com.ssafy.paletteme.domain.artworks.service.ArtworksService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/artworks")
@RequiredArgsConstructor
@Tag(name = "Artworks", description = "작품 관련 API(로그인한 유저만 사용가능)")
public class ArtworksController {
    private final ArtworksService artworkService;

    @GetMapping("/{artworkId}")
    @Operation(summary = "작품 상세 조회", description = "artworkId에 해당하는 작품의 상세 정보를 조회")
    public ApiResponse<ArtworkDetailResponse> getArtworkDetail(@Parameter(description = "작품 ID", required = true) @PathVariable String artworkId) {
        ArtworkDetailResponse response = artworkService.getArtworkDetail(artworkId);
        return ApiResponse.success(response);
    }

    @GetMapping("/{artworkId}/description")
    @Operation(summary = "AI를 통한 작품 설명 ", description = "AI를 통해 artworkId에 해당하는 작품의 설명을 불러옴!")
    public ApiResponse<ArtworkDescriptionResponse> getArtworkDescription(@PathVariable String artworkId) {
        ArtworkDescriptionResponse response = artworkService.getArtworkDescription(artworkId);
        return ApiResponse.success(response);
    }
}
