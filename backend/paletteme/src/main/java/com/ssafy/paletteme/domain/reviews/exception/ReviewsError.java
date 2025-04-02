package com.ssafy.paletteme.domain.reviews.exception;

import lombok.Getter;

@Getter
public enum ReviewsError {
    REVIEW_WRITE_FAILED("500", "3001", "리뷰 작성에 실패하였습니다."),
    USER_NOT_FOUND("400", "3002", "가입되지 않은 사용자입니다."),
    ARTWORKS_NOT_FOUND("500", "3003", "ID에 맞는 ARTWORK를 찾을 수 없습니다"),
    REVIEW_NOT_FOUND("400", "3004", "올바르지 않은 요청입니다."),
    REVIEW_EDIT_UNAUTHORIZED("400", "3005", "수정할 권한이 없습니다.");

    private final String httpStatusCode;
    private final String errorCode;
    private final String errorMsg;

    ReviewsError(String httpStatusCode, String errorCode, String errorMsg) {
        this.httpStatusCode = httpStatusCode;
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }
}
