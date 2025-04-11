package com.ssafy.paletteme.domain.users.exception;

import lombok.Getter;

@Getter
public enum UserError {

    USER_NOT_FOUND("400", "1001", "가입되지 않은 사용자입니다."),
    DUPLICATE_LOGIN_ID("400", "1002", "이미 존재하는 아이디입니다."),
    SIGNUP_USERS_GRADE("500", "1003", "회원가입 시 등급 저장할때 오류!"),
    SIGNUP_USERS_COLOR("500", "1004", "있는 색깔만 보내주라~"),
    SIGNUP_USERS_IMAGE_UPLOAD("500", "1005", "s3 이미지 저장 오류!"),
    SIGNUP_USERS_IMAGE_UPLOAD_EXTENSION("400", "1006", "이미지 확장자는 png, jpg, jpeg만 가능합니다."),
    SIGNUP_USERS_IMAGE_UPLOAD_SIZE("400", "1007", "10MB 이상의 이미지는 사용할 수 없습니다."),
    MYPAGE_USERS_IMAGE_DELETE("500", "1008", "아 s3 이미지 왜 삭제 안돼ㅠㅠ"),
    SECURITY_USERS_PASSWORD_NOT_MATCH("400", "1009", "비밀번호가 올바르지 않습니다."),
    SECURITY_USERS_ACCOUNT_SUSPENDED("400", "1010", "일시정지된 회원입니다."),
    SECURITY_USERS_ID_NOT_MATCH("400", "1011", "ID가 올바르지 않습니다."),
    SECURITY_USERS_FORBIDDEN("400", "1012", "요청하신 리소스에 접근할 권한이 없습니다."),
    SECURITY_USERS_UNAUTHENTICATED("500","1013","하 Security 인증쪽 에러" ),
    SIGNUP_USERS_DUPLICATE_ID("400", "1014", "이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요."),
    AUTH_PHONE_CERTIFICATION_CODE_MISMATCH("400", "1015", "인증번호가 올바르지 않습니다."),
    SIGNUP_USERS_DUPLICATE_NICKNAME("400", "1016", "사용중인 닉네임 입니다");
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