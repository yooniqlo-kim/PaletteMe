package com.ssafy.paletteme.common.security.filter;

import com.ssafy.paletteme.common.response.ApiResponse;
import com.ssafy.paletteme.common.security.exception.SecurityResponseUtil;
import com.ssafy.paletteme.common.security.jwt.JwtUtil;
import com.ssafy.paletteme.common.security.provider.CustomUserDetails;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 로그인,회원 가입 요청은 다음 필터로
        String requestURI = request.getRequestURI();
        // 로그인, 회원가입, 데일리아트는 필터 패스
        if (requestURI.contains("/api/users/login") ||
                requestURI.contains("/api/users/sign-up")   ) {
            filterChain.doFilter(request, response);
            return;
        }


        // 헤더에서 access키에 담긴 토큰을 꺼냄
        String token = request.getHeader("Authorization");

        // 토큰이 없으면 다음 필터로 넘김
        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. 토큰 만료 여부 확인, 만료시 다음 필터로 넘기지 않음
        try {
            jwtUtil.isExpired(token);
        } catch (ExpiredJwtException e) {
            System.out.println("JWT Token Expired");
            ApiResponse apiResponse = new ApiResponse(false,"400", "로그인이 필요합니다. 먼저 로그인해주세요", null);
            SecurityResponseUtil.writeJsonResponse(response, apiResponse);
            return;
        }


        // 3. access 토큰이 있는 경우
        String id = jwtUtil.getId(token);

        // UserDetails 객체 생성
        UserDetails userDetails = userDetailsService.loadUserByUsername(id);

        // SecurityContextHolder에 인증 정보 저장.(추후 사용할 수도 있으니ㅎㅎ)
        Authentication authToken =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
        request.setAttribute("userId", customUserDetails.getUserId());
        filterChain.doFilter(request, response);
    }
}
// BadCredentialsException: EntryPoint에서 예외 처리하기 위함, 다른 예외로 던지면 EntryPoint에서 처리 불가
// TODO: JWT 토큰 만료되었을 경우 처리, RefreshToken 관리 로직 추가(Redis 사용 예정)