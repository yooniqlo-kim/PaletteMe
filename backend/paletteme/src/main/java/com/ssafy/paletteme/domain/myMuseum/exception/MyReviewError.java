package com.ssafy.paletteme.domain.myMuseum.exception;

import lombok.Getter;

@Getter
public enum MyReviewError {
    EMPTY_MY_REVIEW("400", "7001", "감상문이 존재하지 않습니다."),
    INTERNAL_ERROR("500", "7002", "감상문 조회 중 서버 오류가 발생했습니다."),
    USER_NOT_FIND("500", "7003", "유저를 불러올 수 없네?");

    private final String httpStatusCode;
    private final String errorCode;
    private final String errorMsg;

    MyReviewError(String httpStatusCode, String errorCode, String errorMsg) {
        this.httpStatusCode = httpStatusCode;
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }
}
