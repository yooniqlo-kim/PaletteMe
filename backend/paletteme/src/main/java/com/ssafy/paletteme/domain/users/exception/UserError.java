package com.ssafy.paletteme.domain.users.exception;

import lombok.Getter;

@Getter
public enum UserError {

    USER_NOT_FOUND("400", "1001", "가입되지 않은 사용자입니다."),
    ;

    private final String httpStatusCode;
    private final String errorCode;
    private final String errorMsg;

    UserError(String httpStatusCode, String errorCode, String errorMsg) {
        this.httpStatusCode = httpStatusCode;
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }

}