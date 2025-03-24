package com.ssafy.paletteme.domain.users.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users_img")
@Getter
@NoArgsConstructor
public class UsersImg {
    @Id
    @Column(name = "s3_id", length = 255, nullable = false)
    private String s3Id;

    @Column(name = "s3_url", length = 255, nullable = false)
    private String s3Url;
}
