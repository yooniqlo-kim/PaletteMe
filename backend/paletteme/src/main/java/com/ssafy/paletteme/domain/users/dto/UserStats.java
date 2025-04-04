package com.ssafy.paletteme.domain.users.dto;

import com.ssafy.paletteme.domain.users.service.UserStatsService;
import lombok.Getter;

@Getter
public class UserStats {
    private int userId;
    private int reviewCount;
    private int likeCount;
    private int attendance;
    private String grade;

    private UserStats(int userId, int reviewCount, int likeCount, int attendance, String grade) {
        this.userId = userId;
        this.reviewCount = reviewCount;
        this.likeCount = likeCount;
        this.attendance = attendance;
        this.grade = grade;
    }

    public static UserStats of(int userId, int reviewCount, int likeCount, int attendance, String grade) {
        return new UserStats(userId, reviewCount, likeCount, attendance, grade);
    }
}
