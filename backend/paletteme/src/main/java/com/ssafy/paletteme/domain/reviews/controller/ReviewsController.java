package com.ssafy.paletteme.domain.reviews.controller;

import com.ssafy.paletteme.common.response.ApiResponse;
import com.ssafy.paletteme.common.security.annotation.UserId;
import com.ssafy.paletteme.domain.reviews.dto.*;
import com.ssafy.paletteme.domain.reviews.service.ReviewsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reviews")
@Tag(name = "리뷰 API", description = "작품 리뷰 관련 API입니다.")
public class ReviewsController {
    private final ReviewsService reviewService;
    @Operation(summary = "작품 리뷰들 조회 (커서 기반)", description = "처음에는 cursor의 값을 0 혹은 null로 보내주고, 이후로 cursor는 server가 보내준 마지막 reviewId 값을 보내줘야합니다.")
    @GetMapping
    public ApiResponse<ReviewListResponse> getReviewsCursorPaging( @Parameter(description = "작품 ID", example = "MonaLisa_Leonardo") @RequestParam String artworkId,
                                                                   @Parameter(description = "마지막 reviewId", example = "13") @RequestParam(required = false) Integer cursor,
                                                                   @Parameter(description = "한 페이지에 가져올 리뷰 수", example = "10") @RequestParam(defaultValue = "10") int size){
        ReviewListResponse response = reviewService.getReviewsCursorPaging(artworkId, cursor, size);
        return ApiResponse.success(response);
    }

    @Operation(summary = "리뷰 작성", description = "로그인한 사용자만 리뷰 작성가능")
    @PostMapping("/write")
    public ApiResponse<Void> writeReview(@Parameter(hidden = true) @UserId int userId, @RequestBody ReviewsWriteRequest request) {
        reviewService.writeReview(userId, request);
        return ApiResponse.success();
    }

    @Operation(summary = "리뷰 상세 조회", description = "리뷰 ID를 기준으로 리뷰와 작품 상제 정보도 조회")
    @GetMapping("/{reviewId}")
    public ApiResponse<ReviewsWithArtworkResponses> getReviewWithArtwork(@Parameter(hidden = true) @UserId int userId, @Parameter(description = "리뷰 ID") @PathVariable int reviewId) {
        ReviewsWithArtworkResponses responses = reviewService.getReviewsWithArtwork(userId, reviewId);
        return ApiResponse.success(responses);
    }

    @Operation(summary = "리뷰 수정", description = "리뷰 ID를 기준으로 기존 리뷰를 수정")
    @PostMapping("/{reviewId}/edit")
    public ApiResponse<ReviewsEditResponse> editReview(@Parameter(hidden = true) @UserId int userId, @Parameter(description = "리뷰 ID") @PathVariable int reviewId, @RequestBody ReviewsEditRequest request){
        ReviewsEditResponse response = reviewService.editReview(userId, reviewId, request);
        return ApiResponse.success(response);
    }

    @Operation(summary = "리뷰 삭제", description = "리뷰 ID를 기준으로 사용자가 본인의 리뷰를 삭제")
    @PostMapping("/{reviewId}/delete")
    public ApiResponse<Void> deleteReview(@Parameter(hidden = true) @UserId int userId, @PathVariable int reviewId){
        reviewService.deleteReview(userId, reviewId);
        return ApiResponse.success();
    }
}
