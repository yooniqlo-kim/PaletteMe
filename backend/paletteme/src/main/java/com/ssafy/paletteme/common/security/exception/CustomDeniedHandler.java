package com.ssafy.paletteme.common.security.exception;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.paletteme.common.response.ApiResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

// 인가 실패
@Component
public class CustomDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        ApiResponse apiResponse = ApiResponse.error("500", "요청하신 리소스에 접근할 권한이 없습니다.");
        SecurityResponseUtil.writeJsonResponse(response, apiResponse);

    }
}
