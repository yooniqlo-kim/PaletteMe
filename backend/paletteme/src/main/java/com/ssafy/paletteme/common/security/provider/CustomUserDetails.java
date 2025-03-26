package com.ssafy.paletteme.common.security.provider;

import com.ssafy.paletteme.domain.users.entity.Users;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
public class CustomUserDetails implements UserDetails {
    private int userId;
    private String id;
    private String password;
    private String nickname;
    private String grade;
    private String s3Url;
    private String name;


    private CustomUserDetails(int userId, String id, String password, String nickname, String grade, String s3Url, String name) {
        this.userId = userId;
        this.id = id;
        this.password = password;
        this.nickname = nickname;
        this.grade = grade;
        this.s3Url = s3Url;
        this.name = name;
    }

    public static CustomUserDetails fromEntity(Users users) {
        return new CustomUserDetails(users.getUserId(), users.getLoginId(), users.getPassword(), users.getNickname(), users.getGrade().getGrade(), users.getS3Url() ,users.getName());
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return id;
    }
}
