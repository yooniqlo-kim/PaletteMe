package com.ssafy.paletteme.common.security.provider;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/*
* 궁금한 점: 이거는 또 @Component로 등록하네??? Security는 가급적 무슨 순서 때문에 가급적 수동 bean으로 등록하라지 않았나????
* SecurityContext가 뭐지??
* DetailService의 빈 등록 어노테이션으로 @Component, @Service 중 뭐가 더 적절할까???
* */
@Component
@RequiredArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider{
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        return null;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return false;
    }
}
