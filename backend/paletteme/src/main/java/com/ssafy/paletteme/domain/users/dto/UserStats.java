package com.ssafy.paletteme.domain.users.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
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

    public void incrementReviewCount() {
        this.reviewCount += 1;
    }

    public void incrementLikeCount() {
        this.likeCount += 1;
    }

    public void incrementAttendance() {
        this.attendance += 1;
    }

    public void updateGrade(String grade) {
        this.grade = grade;
    }

    public static UserStats of(int userId, int reviewCount, int likeCount, int attendance, String grade) {
        return new UserStats(userId, reviewCount, likeCount, attendance, grade);
    }

    public static String calculateGrade(int reviewCount, int likeCount, int attendance) {
        if (reviewCount >= 100 && likeCount >= 200 && attendance >= 30) return "5";
        if (reviewCount >= 30 && likeCount >= 50 && attendance >= 14) return "4";
        if (reviewCount >= 10 && likeCount >= 20 && attendance >= 5) return "3";
        if (reviewCount >= 3 && likeCount >= 10 && attendance >= 1) return "2";
        return "1";
    }
}
