package com.ssafy.paletteme.domain.users.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users_img")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UsersImg {
    @Id
    @Column(name = "s3_id", length = 500, nullable = false)
    private String s3Id;

    @Column(name = "s3_url", length = 500, nullable = false)
    private String s3Url;

    @Builder
    private UsersImg(String url, String fileKey) {
        this.s3Url = url;
        this.s3Id = fileKey;
    }
}
