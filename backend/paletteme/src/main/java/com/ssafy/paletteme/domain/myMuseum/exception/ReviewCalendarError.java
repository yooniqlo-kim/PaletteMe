package com.ssafy.paletteme.domain.myMuseum.exception;

import lombok.Getter;

@Getter
public enum ReviewCalendarError {

    EMPTY_REVIEWS("400", "4001", "해당 월에는 리뷰가 존재하지 않습니다."),
    INTERNAL_ERROR("500", "4002", "리뷰 조회 중 서버 오류가 발생했습니다.");

    private final String httpStatusCode;
    private final String errorCode;
    private final String errorMsg;

    ReviewCalendarError(String httpStatusCode, String errorCode, String errorMsg) {
        this.httpStatusCode = httpStatusCode;
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }
}
