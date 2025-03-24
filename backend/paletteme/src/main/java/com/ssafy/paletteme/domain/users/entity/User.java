package com.ssafy.paletteme.domain.users.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "grade_id",
            nullable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT)
    )
    private UsersGrade grade;

    @Column(name = "s3_url", nullable = false, length = 255)
    private String s3Url;

    @Column(name = "id", nullable = false, length = 255)
    private String loginId;

    @Column(name = "password", length = 500)
    private String password;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "birthday", nullable = false)
    private LocalDate birthday;

    @Column(name = "phone_number", nullable = false, length = 500)
    private String phoneNumber;

    @Column(name = "nickname", nullable = false, length = 50)
    private String nickname;

    @Column(name = "active", nullable = false)
    private Boolean active;

    @Column(name = "attendance")
    private Integer attendance = 0;

    @Column(name = "logined_at")
    private LocalDate loginedAt;

}
