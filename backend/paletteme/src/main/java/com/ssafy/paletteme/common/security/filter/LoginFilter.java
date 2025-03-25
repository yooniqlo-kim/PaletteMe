package com.ssafy.paletteme.common.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.paletteme.common.response.ApiResponse;
import com.ssafy.paletteme.common.security.jwt.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/*
  [1] LoginFilter.attemptAuthentication() -> 사용자 인증의 시작점
         AuthenticationManager.authenticate(token) : id, pwd, role을 담아야함.
  [2] CustomAuthenticationProvider.authenticate() -> 비밀번호 일치 여부 + 검증 + 사용자 정보 조회
            (1) CustomUserDetailService.loadUserByUsername() -> 사용자 정보 조회
            (2) return new CustomUserDetails(user) : UserDetails를 상속한 class에 담아야함.
  [3] Authentication 반환
        ** SecurityContext 에 저장..?
        결과에 따라 LoginFilter의 success, unsucess가 호출됨.
*/

public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public LoginFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        //클라이언트 요청에서 id, password 추출(form-data 형식)
        String id = request.getParameter("id");
        String password = request.getParameter("password");
        System.out.println(id +"," + password);

        //스프링 시큐리티에서 email과 password를 검증하기 위해서는 token에 담아야 함, 세번째 인자는 ROLE.
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(id, password, null);

        //사용자 정보를 담은 token을 AuthenticationManager에 전달
        return authenticationManager.authenticate(authToken);
    }

    //로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {
        System.out.println("-----LoginFilter.successfulAuthentication-----");
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("success", true);
        responseData.put("message", "로그인 성공 :)");

        String accessToken = jwtUtil.createJwt("access", userDetails.getUserId(), userDetails.getEmail(),"ROLE_USER",600000000L);
        String refreshToken = jwtUtil.createJwt("refresh", userDetails.getUserId(), userDetails.getEmail(),"ROLE_USER",600000000L); ;
        userService.updateRefreshToken(userDetails.getUserId(), refreshToken);

        UserLoginResponse userLoginResponse = UserLoginResponse.builder()
                .userId(userDetails.getUserId())
                .email(userDetails.getEmail())
                .nickname(userDetails.getNickname())
                .profileUrl(userDetails.getProfileUrl())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
//        Map<String, Object> results = new HashMap<>();
//        results.put("userId", userDetails.getUserId());
//        results.put("email", userDetails.getEmail());
//        results.put("nickname", userDetails.getNickname());
//        results.put("accessToken", accessToken);
//        results.put("refreshToken", refreshToken);
        responseData.put("results", userLoginResponse);

        // JSON 문자열로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(responseData); //예외처리 좀 더 생각해보기

        // 응답 설정
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpStatus.OK.value());
        response.getWriter().write(jsonResponse);
        response.getWriter().flush();
    }

    //로그인 실패시 실행되는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, org.springframework.security.core.AuthenticationException failed) throws IOException, ServletException {
        System.out.println("-----LoginFilter.unsuccessfulAuthentication-----");

        ApiResponse<Void> result = ApiResponse.error("0003", "비밀번호가 올바르지 않습니다.");
        String jsonResponse = new ObjectMapper().writeValueAsString(result);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(jsonResponse);
        response.getWriter().flush();

    }
}

