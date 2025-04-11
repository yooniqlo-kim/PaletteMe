package com.ssafy.paletteme.domain.users.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PasswordVerifyResponse {
    private String loginId;
    private String name;
    private int birthday;
    private String phoneNumber;


    @Builder
    public PasswordVerifyResponse(String loginId, String name, int birthday, String phoneNumber) {
        this.loginId = loginId;
        this.name = name;
        this.birthday = birthday;
        this.phoneNumber = phoneNumber;
    }
}
