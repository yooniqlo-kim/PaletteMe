package com.ssafy.paletteme.domain.myMuseum.exception;

public class MyReviewException extends RuntimeException {
    public final MyReviewError error;

    public MyReviewException(MyReviewError error) {
        super(error.getErrorMsg());
        this.error = error;
    }

    public MyReviewError getError() {
        return error;
    }
}
