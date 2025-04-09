package com.ssafy.paletteme.domain.users.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserLoginResponse {
    private String id;
    private String nickname;
    private String s3Url;
    private String accessToken;
    private String refreshToken;


    @Builder
    public UserLoginResponse(String id, String nickname, String s3Url, String accessToken, String refreshToken) {
        this.id = id;
        this.nickname = nickname;
        this.s3Url = s3Url;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
