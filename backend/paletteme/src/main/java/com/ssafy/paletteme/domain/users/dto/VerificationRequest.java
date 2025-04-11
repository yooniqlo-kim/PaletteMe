package com.ssafy.paletteme.domain.users.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class VerificationRequest {
    private String phoneNumber;
    String verificationCode;
}
