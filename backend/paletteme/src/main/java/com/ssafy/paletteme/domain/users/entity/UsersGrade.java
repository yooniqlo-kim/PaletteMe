package com.ssafy.paletteme.domain.users.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users_grade")
@Getter
@NoArgsConstructor
public class UsersGrade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer gradeId;

    @Column(name = "grade", length = 10, nullable = false)
    private String grade;
}
