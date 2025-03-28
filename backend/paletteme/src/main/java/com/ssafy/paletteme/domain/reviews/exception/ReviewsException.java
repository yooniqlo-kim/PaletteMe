package com.ssafy.paletteme.domain.reviews.exception;

public class ReviewsException extends RuntimeException{
    private final ReviewsError error;

    public ReviewsException(ReviewsError error) {
        super(error.getErrorMsg());
        this.error = error;
    }

    public ReviewsError getError() {
        return error;
    }
}
