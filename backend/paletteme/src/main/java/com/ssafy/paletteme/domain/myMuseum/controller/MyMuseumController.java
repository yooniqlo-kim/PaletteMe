package com.ssafy.paletteme.domain.myMuseum.controller;

import com.ssafy.paletteme.common.response.ApiResponse;
import com.ssafy.paletteme.common.security.annotation.UserId;
import com.ssafy.paletteme.domain.myMuseum.dto.LikedCollectionResponse;
import com.ssafy.paletteme.domain.myMuseum.dto.ReviewCalendarResponse;
import com.ssafy.paletteme.domain.myMuseum.service.LikedCollectionService;
import com.ssafy.paletteme.domain.myMuseum.service.ReviewCalendarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mymuseum")
@RequiredArgsConstructor
@Tag(name = "MyMuseum", description = "마이 뮤지엄 API(로그인한 유저만 사용가능)")
public class MyMuseumController {
    private final ReviewCalendarService reviewCalendarService;
    private final LikedCollectionService likedCollectionService;

    @Operation(summary = "캘린더 데이터 조회", description = "연, 월을 기준으로 해당 월의 리뷰 데이터 전체 조회")
    @GetMapping("/reviews/dates")
    public ApiResponse<List<ReviewCalendarResponse>> getReviewWithArtwork(@Parameter(hidden = true) @UserId int userId,
                                                                          @RequestParam int year,
                                                                          @RequestParam int month) {

        List<ReviewCalendarResponse> responses = reviewCalendarService.getReviewCalendar(userId, year, month);
        return ApiResponse.success(responses);
    }

    @GetMapping("/artworks/liked")
    public ApiResponse<List<LikedCollectionResponse>> getLikedCollection(@Parameter(hidden = true) @UserId int userId,
                                                                         @RequestParam(required = false, defaultValue = "0") int cursor,
                                                                         @RequestParam int size) {

        List<LikedCollectionResponse> responses = likedCollectionService.getLikedCollection(userId, cursor, size);
        return ApiResponse.success(responses);
    }
}
