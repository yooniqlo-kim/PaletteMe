package com.ssafy.paletteme.common.security.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.paletteme.common.response.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class SecurityResponseUtil {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static void writeJsonResponse(HttpServletResponse response, ApiResponse apiResponse) throws IOException {
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String json = objectMapper.writeValueAsString(apiResponse);
        response.getWriter().write(json);
        response.getWriter().flush();
    }
}
