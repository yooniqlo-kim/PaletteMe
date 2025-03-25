package com.ssafy.paletteme.domain.users.exception;

import lombok.Getter;

@Getter
public enum UserError {

    USER_NOT_FOUND("400", "1001", "가입되지 않은 사용자입니다."),
    DUPLICATE_LOGIN_ID("400", "1002", "이미 존재하는 아이디입니다."),
    SIGNUP_USERS_GRADE("500", "1003", "회원가입 시 등급 저장할때 오류!"),
    SIGNUP_USERS_COLOR("500", "1004", "있는 색깔만 보내주라~"),
    SIGNUP_USERS_IMAGE_UPLOAD("500", "1005", "s3 이미지 저장 오류!")
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