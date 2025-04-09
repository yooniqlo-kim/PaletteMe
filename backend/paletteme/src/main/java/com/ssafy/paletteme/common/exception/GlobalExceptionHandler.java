package com.ssafy.paletteme.common.exception;

import com.ssafy.paletteme.common.response.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ApiResponse<Object> handleGlobalException(Exception ex) {
        logger.error("Unhandled exception occurred: {}", ex.getMessage(), ex);

        return ApiResponse.error("500", "일시적인 서버 오류가 발생했습니다");
    }

}