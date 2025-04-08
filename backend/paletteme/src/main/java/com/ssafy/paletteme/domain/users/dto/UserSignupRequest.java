package com.ssafy.paletteme.domain.users.dto;

import com.ssafy.paletteme.domain.users.entity.Users;
import com.ssafy.paletteme.domain.users.entity.UsersGrade;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@ToString
@NoArgsConstructor
@Getter
public class UserSignupRequest {
    private String id;
    private String password;
    private String name;
    private int birthday;
    private String phoneNumber;
    private String nickname;
    private List<String> artworkId;
    private List<String> color;

    public Users toEntity(String s3Url, String encodedPassword, UsersGrade usersGrade, String encodedPhoneNumber) {
        return Users.builder()
                .loginId(id)
                .password(encodedPassword)
                .name(name)
                .birthday(birthday)
                .phoneNumber(encodedPhoneNumber)
                .nickname(nickname)
                .s3Url(s3Url)
                .usersGrade(usersGrade)
                .build();
    }

}
