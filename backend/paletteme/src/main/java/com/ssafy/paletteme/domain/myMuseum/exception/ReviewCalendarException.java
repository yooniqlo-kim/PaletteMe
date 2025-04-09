package com.ssafy.paletteme.domain.myMuseum.exception;

public class ReviewCalendarException extends RuntimeException {
    private final ReviewCalendarError error;

    public ReviewCalendarException(ReviewCalendarError error) {
        super(error.getErrorMsg());
        this.error = error;
    }

    public ReviewCalendarError getError() {
        return error;
    }
}
