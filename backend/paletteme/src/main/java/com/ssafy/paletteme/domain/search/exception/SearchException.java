package com.ssafy.paletteme.domain.search.exception;

public class SearchException extends RuntimeException {

    private final SearchError error;

    public SearchException(SearchError error) {
        super(error.getErrorMsg());
        this.error = error;
    }

    public SearchError getError() {
        return error;
    }
}
