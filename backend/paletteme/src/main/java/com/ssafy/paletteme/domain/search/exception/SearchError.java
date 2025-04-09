package com.ssafy.paletteme.domain.search.exception;

import lombok.Getter;

@Getter
public enum SearchError {

    EMPTY_KEYWORD("400", "2001", "검색어가 비어 있습니다."),
    NO_RESULT_FOUND("404", "2002", "더 이상 검색되는 결과가 없습니다."),
    ELASTICSEARCH_ERROR("500", "2003", "Elasticsearch 검색 중 오류가 발생했습니다.");

    private final String httpStatusCode;
    private final String errorCode;
    private final String errorMsg;

    SearchError(String httpStatusCode, String errorCode, String errorMsg) {
        this.httpStatusCode = httpStatusCode;
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }
}
