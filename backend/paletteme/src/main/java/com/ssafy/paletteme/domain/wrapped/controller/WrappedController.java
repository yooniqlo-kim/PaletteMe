package com.ssafy.paletteme.domain.wrapped.controller;

import com.ssafy.paletteme.common.response.ApiResponse;
import com.ssafy.paletteme.common.security.annotation.UserId;
import com.ssafy.paletteme.domain.wrapped.dto.WrappedResponse;
import com.ssafy.paletteme.domain.wrapped.service.WrappedService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Wrapped", description = "Wrapped API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/mymuseum/wrapped")
public class WrappedController {
    private final WrappedService wrappedService;

    @GetMapping
    @Operation(summary = "Wrapped 조회", description = "wrapped에서 사용할 모든 데이터를 보내드립니다♥")
    public ApiResponse<WrappedResponse> getWrappedData(@Parameter(hidden = true) @UserId int userId) {
        WrappedResponse response = wrappedService.getWrappedData(userId);
        return ApiResponse.success(response);
    }
}
