package com.ssafy.paletteme.domain.users.dto;

import lombok.Getter;

@Getter
public class UserProfileResponse {
    private final int reviewCount;
    private final int artworkLikeCount;
    private final int attendance;
    private final String grade;
    private final String nickname;
    private final String userImageUrl;

    private UserProfileResponse(int reviewCount, int artworkLikeCount, int attendance, String grade, String nickname, String userImageUrl) {
        this.reviewCount = reviewCount;
        this.artworkLikeCount = artworkLikeCount;
        this.attendance = attendance;
        this.grade = grade;
        this.nickname = nickname;
        this.userImageUrl = userImageUrl;
    }

    public static UserProfileResponse of(int reviewCount, int artworkLikeCount, int attendance, String grade, String nickname, String userImageUrl) {
        return new UserProfileResponse(reviewCount, artworkLikeCount, attendance, grade, nickname, userImageUrl);
    }
}
