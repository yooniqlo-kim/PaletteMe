package com.ssafy.paletteme.common.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.paletteme.common.redis.RedisService;
import com.ssafy.paletteme.common.response.ApiResponse;
import com.ssafy.paletteme.common.security.exception.SecurityResponseUtil;
import com.ssafy.paletteme.common.security.jwt.JwtUtil;
import com.ssafy.paletteme.common.security.provider.CustomUserDetails;
import com.ssafy.paletteme.domain.users.dto.UserLoginResponse;
import com.ssafy.paletteme.domain.users.dto.UserStats;
import com.ssafy.paletteme.domain.users.service.UserStatsService;
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
import java.time.Duration;


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
/*
    BadCredentialsException을 포함한 AuthenticationException은
    인증 시도 과정에서는 AuthenticationEntryPoint가 아니라
    LoginFilter의 unsuccessfulAuthentication()에서 처리됨.
*/

public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final RedisService redisService;
    private final UserStatsService userStatsService;

    public                                                                                                                                                                                                                                                                                                                                  LoginFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil, RedisService redisService, UserStatsService  userStatsService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.redisService = redisService;
        this.userStatsService = userStatsService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        //클라이언트 요청에서 id, password 추출(form-data 형식)
        String id = request.getParameter("id");
        String password = request.getParameter("password");

        // id, password를 token에 담고, 세번째 인자는 ROLE.
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(id, password, null);

        //사용자 정보를 담은 token을 AuthenticationManager에 전달
        return authenticationManager.authenticate(authToken);
    }

    //로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // Redis에 사용자의 등업 관련 정보 저장하기
        UserStats userStats = userStatsService.generateStatsForUser(userDetails.getUserId());
        //TODO: 로그아웃 시 해당 데이터를 지워주고, 시간에 대한 설정은 추후에 수정하기
        redisService.saveUserStats(userStats, Duration.ofDays(1));



        // jwt 생성
        String role = "ROLE_USER";
        String accessToken = jwtUtil.createJwt("access", userDetails.getUserId(), userDetails.getId(),role);
        String refreshToken = jwtUtil.createJwt("refresh", userDetails.getUserId(), userDetails.getId(),role); ;

        // 로그인 후, 필요한 데이터 담기
        UserLoginResponse data = UserLoginResponse.builder()
                .id(userDetails.getId())
                .nickname(userDetails.getNickname())
                .s3Url(userDetails.getS3Url())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        ApiResponse<UserLoginResponse> apiResponse = ApiResponse.success(data);

        // JSON 문자열로 응답
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(apiResponse);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpStatus.OK.value());
        response.getWriter().write(jsonResponse);
        response.getWriter().flush();
    }

    //로그인 실패시 실행되는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, org.springframework.security.core.AuthenticationException failed) throws IOException, ServletException {
        ApiResponse apiResponse = new ApiResponse(false,"400", failed.getMessage(), null);
        SecurityResponseUtil.writeJsonResponse(response, apiResponse);

    }
}

