package com.ssafy.paletteme.domain.users.dto;

import lombok.Getter;

@Getter
public class UserProfileResponse {
    private final int reviewCount;
    private final int artworkLikeCount;
    private final int attendance;
    private final String grade;

    private UserProfileResponse(int reviewCount, int artworkLikeCount, int attendance, String grade) {
        this.reviewCount = reviewCount;
        this.artworkLikeCount = artworkLikeCount;
        this.attendance = attendance;
        this.grade = grade;
    }

    public static UserProfileResponse of(int reviewCount, int artworkLikeCount, int attendance, String grade) {
        return new UserProfileResponse(reviewCount, artworkLikeCount, attendance, grade);
    }
}
