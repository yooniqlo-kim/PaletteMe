package com.ssafy.paletteme.domain.users.exception;

public class UserException extends RuntimeException {

    private final UserError error;

    public UserException(UserError error) {
        super(error.getErrorMsg());
        this.error = error;
    }

    public UserError getError() {
        return error;
    }

}
