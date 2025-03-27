package com.ssafy.paletteme.common.security.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.paletteme.common.response.ApiResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

// 인증 실패
@Component
public class CustomEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        String message = "로그인이 필요합니다. 먼저 로그인해주세요.";
        if (authException instanceof BadCredentialsException) {
            message = authException.getMessage();
        }

        ApiResponse apiResponse = new ApiResponse(false,"500", message, null);
        SecurityResponseUtil.writeJsonResponse(response, apiResponse);

    }
}
