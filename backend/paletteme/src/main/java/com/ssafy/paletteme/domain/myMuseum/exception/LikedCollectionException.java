package com.ssafy.paletteme.domain.myMuseum.exception;

public class LikedCollectionException extends RuntimeException {
    public final LikedCollectionError error;

    public LikedCollectionException(LikedCollectionError error) {
        super(error.getErrorMsg());
        this.error = error;
    }

    public LikedCollectionError getError() {
        return error;
    }
}
