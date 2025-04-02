package com.ssafy.paletteme.domain.artworks.exception;

import lombok.Getter;

@Getter
public enum ArtworksError {
    GPT_RESPONSE_FAILED("500", "5001", "GPT 응답 실패"),
    ARTWORK_NOT_FOUND("400", "5002", "작품을 찾을 수 없습니다."),
    ARTWORK_ALREADY_LIKED("500", "5003", "이미 좋아요한 작품입니다.(해당 API가 호출되면 안됨)"),
    ARTWORK_NOT_LIKED("500", "5004", "좋아요한 기록이 없습니다(해당 API가 호출되면 안됨)"),
    USER_NOT_FOUND("400", "5005", "사용자를 찾을 수 없습니다."),
    ARTWORKLIKECNT_NOT_FOUND("500", "5006", "작품 좋아요 테이블에 해당 ARTWORK를 저장하고 있지 않음."),
    ARTWORK_ALREADY_BOOKMARKED("500", "5007", "이미 북마크에 추가됨(해당 API가 호출되면 안됨)"),
    ARTWORK_NOT_BOOKMARKED("500", "5008", "유저는 북마크 추가를 하지 않음(API가 호출되면 안됨)");
    private final String httpStatusCode;
    private final String errorCode;
    private final String errorMsg;

    ArtworksError(String httpStatusCode, String errorCode, String errorMsg) {
        this.httpStatusCode = httpStatusCode;
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }
}
