package com.ssafy.paletteme.domain.artworks.exception;

import lombok.Getter;

@Getter
public enum ArtworksError {
    GPT_RESPONSE_FAILED("500", "5001", "GPT 응답 실패");

    private final String httpStatusCode;
    private final String errorCode;
    private final String errorMsg;

    ArtworksError(String httpStatusCode, String errorCode, String errorMsg) {
        this.httpStatusCode = httpStatusCode;
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }
}
