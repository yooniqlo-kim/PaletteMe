package com.ssafy.paletteme.domain.users.entity;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@Getter
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    // 지연 로딩 시, Security에서 사용 불가.. 추후 개선하기
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "grade_id",
            nullable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT)
    )
    private UsersGrade grade;

    @Column(name = "s3_url", nullable = false, length = 255)
    private String s3Url;

    @Column(name = "id", nullable = false, length = 255, unique = true)
    private String loginId;

    @Column(name = "password", length = 500)
    private String password;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "birthday", nullable = false)
    private int birthday;

    @Column(name = "phone_number", nullable = false, length = 500)
    private String phoneNumber;

    @Column(name = "nickname", nullable = false, length = 50)
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(name = "active", nullable = false)
    private AccountStatus isActive;

    @Column(name = "attendance")
    private Integer attendance = 0;

    @Column(name = "logined_at")
    private LocalDate loginedAt;

    @Builder
    public Users(String loginId, String password, String name, int birthday, String phoneNumber, String nickname, String s3Url, UsersGrade usersGrade){
        this.loginId = loginId;
        this.password = password;
        this.name = name;
        this.birthday = birthday;
        this.phoneNumber = phoneNumber;
        this.nickname = nickname;
        this.s3Url = s3Url;
        this.grade = usersGrade;
    }

    @PrePersist
    private void prePersist() {
        if(isActive == null){
            isActive = AccountStatus.ACTIVE;
        }
    }

    public enum AccountStatus {
        PENDING,   // 인증 대기 중
        ACTIVE,    // 인증 완료 및 활성화
        INACTIVE,  // 비활성화된 계정
        LOCKED     // 잠긴 계정
    }
}

