package com.ssafy.paletteme.domain.myMuseum.controller;

import com.ssafy.paletteme.common.response.ApiResponse;
import com.ssafy.paletteme.common.security.annotation.UserId;
import com.ssafy.paletteme.domain.myMuseum.dto.*;
import com.ssafy.paletteme.domain.myMuseum.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/mymuseum")
@RequiredArgsConstructor
@Tag(name = "MyMuseum", description = "마이 뮤지엄 API(로그인한 유저만 사용가능)")
public class MyMuseumController {
    private final ReviewCalendarService reviewCalendarService;
    private final LikedCollectionService likedCollectionService;
    private final MyReviewsService myReviewsService;
    private final BookmarkedCollectionService bookmarkedCollectionService;
    private final LikedOtherReviewsService likedOtherReviewsService;
    private final RecommendColorService recommendColorService;

    @Operation(summary = "캘린더 데이터 조회", description = "연, 월을 기준으로 해당 월의 리뷰 데이터 전체 조회")
    @GetMapping("/reviews/monthly")
    public ApiResponse<List<MonthlyReviewResponse>> getMonthlyReviewCalendar(@Parameter(hidden = true) @UserId int userId,
                                                                          @RequestParam int year,
                                                                          @RequestParam int month) {

        List<MonthlyReviewResponse> responses = reviewCalendarService.getMonthlyReviewCalendar(userId, year, month);
        return ApiResponse.success(responses);
    }

    @Operation(summary = "캘린더 데이터 일주일치 조회", description = "시작일, 종료일을 기준으로 해당 기간의 리뷰 데이터 전체 조회")
    @GetMapping("/reviews/weekly")
    public ApiResponse<List<WeeklyReviewResponse>> getWeeklyReviewCalendar(@Parameter(hidden = true) @UserId int userId,
                                                                          @RequestParam LocalDate startDate,
                                                                          @RequestParam LocalDate endDate) {

        List<WeeklyReviewResponse> responses = reviewCalendarService.getWeeklyReviewCalendar(userId, startDate, endDate);
        return ApiResponse.success(responses);
    }

    @Operation(summary = "사용자가 좋아요한 작품 목록 조회", description = "사용자가 좋아요한 작품을 커서 기반 보여줌")
    @GetMapping("/artworks/liked")
    public ApiResponse<List<LikedCollectionResponse>> getLikedCollection(@Parameter(hidden = true) @UserId int userId,
                                                                         @RequestParam(required = false) Integer cursor,
                                                                         @RequestParam int size) {

        List<LikedCollectionResponse> responses = likedCollectionService.getLikedCollection(userId, cursor, size);
        return ApiResponse.success(responses);
    }

    @Operation(summary = "사용자의 리뷰 목록 조회", description = "사용자가 작성한 리뷰를 커서 기반 보여줌")
    @GetMapping("/reviews")
    public ApiResponse<List<MyReviewsResponse>> getMyReviews(@Parameter(hidden = true) @UserId int userId,
                                                                      @RequestParam(required = false) Integer cursor,
                                                                      @RequestParam int size) {

        List<MyReviewsResponse> responses = myReviewsService.getMyReviews(userId, cursor, size);
        return ApiResponse.success(responses);
    }

    @Operation(summary = "사용자의 북마크 목록 조회", description = "사용자가 작성한 리뷰를 커서 기반 보여줌")
    @GetMapping("/artworks/bookmarked")
    public ApiResponse<List<BookmarkedCollectionResponse>> getBookmarkedCollection(@Parameter(hidden = true) @UserId int userId,
                                                                                            @RequestParam(required = false) Integer cursor,
                                                                                            @RequestParam int size) {

        List<BookmarkedCollectionResponse> responses = bookmarkedCollectionService.getBookmarkedCollection(userId, cursor, size);
        return ApiResponse.success(responses);
    }

    @Operation(summary = "사용자가 좋아요한 리뷰 목록 조회", description = "사용자가 좋아요한 리뷰 목록을 커서 기반으로 조회")
    @GetMapping("/reviews/liked")
    public ApiResponse<List<LikedOtherReviewsResponse>> getLikedOtherReviews(
            @Parameter(hidden = true) @UserId int userId,
            @RequestParam(required = false) Integer cursor,
            @RequestParam int size) {

        List<LikedOtherReviewsResponse> responses = likedOtherReviewsService.getLikedOtherReviews(userId, cursor, size);
        return ApiResponse.success(responses);
    }

    @Operation(summary = "색상 추천 컬렉션 조회", description = "사용자가 선호한 색상 기반으로 추천 조회")
    @GetMapping("/recommend/color")
    public ApiResponse<List<RecommendResponse>> recommendByColor(
            @Parameter(hidden = true) @UserId int userId,
            @RequestParam int size) {

        List<RecommendResponse> responses = recommendColorService.recommend(userId, size);
        return ApiResponse.success(responses);
    }

}
