package com.ssafy.paletteme.domain.myMuseum.exception;

import com.ssafy.paletteme.common.response.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Order(2)
public class MyReviewExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(MyReviewExceptionHandler.class);

    @ExceptionHandler(MyReviewException.class)
    public ApiResponse<Object> handleMyReviewException(MyReviewException exception) {
        MyReviewError error = exception.getError();

        String clientMsg = error.getHttpStatusCode().startsWith("4")
                ? error.getErrorMsg()
                : "일시적인 서버 오류가 발생했습니다";

        return ApiResponse.error(error.getErrorCode(), clientMsg);
    }
}
