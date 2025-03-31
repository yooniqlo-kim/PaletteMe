package com.ssafy.paletteme.domain.artworks.exception;

import com.ssafy.paletteme.common.response.ApiResponse;
import com.ssafy.paletteme.domain.reviews.exception.ReviewsError;
import com.ssafy.paletteme.domain.reviews.exception.ReviewsException;
import org.springframework.core.annotation.Order;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Order(2)
public class ArtworksExceptionHandler {
    @ExceptionHandler(ArtworksException.class)
    public ApiResponse<Object> handleUserException(ArtworksException exception) {
        ArtworksError error = exception.getError();

        String clientMsg = error.getHttpStatusCode().startsWith("4")
                ? error.getErrorMsg()
                : "일시적인 서버 오류가 발생했습니다";

        return ApiResponse.error(error.getErrorCode(), clientMsg);
    }
}
