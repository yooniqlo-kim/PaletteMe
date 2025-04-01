package com.ssafy.paletteme.domain.myMuseum.exception;

import lombok.Getter;

@Getter
public enum LikedCollectionError {

    EMPTY_LIKED_COLLECTION("400", "6001", "좋아요한 작품이 존재하지 않습니다."),
    INTERNAL_ERROR("500", "6002", "좋아요한 작품 조회 중 서버 오류가 발생했습니다.");

    private final String httpStatusCode;
    private final String errorCode;
    private final String errorMsg;

    LikedCollectionError(String httpStatusCode, String errorCode, String errorMsg) {
        this.httpStatusCode = httpStatusCode;
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }
}
