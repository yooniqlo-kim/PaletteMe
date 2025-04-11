package com.ssafy.paletteme.domain.myMuseum.exception;

public class BookmarkedCollectionException extends RuntimeException {
    public final BookmarkedCollectionError error;

    public BookmarkedCollectionException(BookmarkedCollectionError error) {
        super(error.getErrorMsg());
        this.error = error;
    }

    public BookmarkedCollectionError getError() {
        return error;
    }
}
