package com.ssafy.paletteme.domain.search.controller;

import com.ssafy.paletteme.common.response.ApiResponse;
import com.ssafy.paletteme.domain.search.dto.ArtworkSearchResponse;
import com.ssafy.paletteme.domain.search.service.ArtworkSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/search")
public class ArtworkSearchController {

    private final ArtworkSearchService artworkSearchService;

    @GetMapping(value = "/artworks")
    public ApiResponse<List<ArtworkSearchResponse>> search(@RequestParam String keyword,
                                                           @RequestParam(required = false) Double lastScore,
                                                           @RequestParam(required = false) String lastArtworkId,
                                                           @RequestParam int size) {
        return ApiResponse.success(artworkSearchService.searchByKeyword(keyword, lastScore, lastArtworkId, size));
    }
}
