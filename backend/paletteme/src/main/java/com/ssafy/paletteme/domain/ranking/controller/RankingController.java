package com.ssafy.paletteme.domain.ranking.controller;

import com.ssafy.paletteme.common.response.ApiResponse;
import com.ssafy.paletteme.domain.artworks.repository.ArtworksRepository;
import com.ssafy.paletteme.domain.ranking.service.RankingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Ranking", description = "Ranking API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/ranking")
public class RankingController {

    private final RankingService rankingService;

    @GetMapping
    @Operation(summary = "인기 작품 순위 조회", description = "")
    public ApiResponse<List<String>> ranking() {
        List<String> responses = rankingService.ranking();
        return ApiResponse.success(responses);
    }

}
