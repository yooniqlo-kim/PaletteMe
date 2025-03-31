package com.ssafy.paletteme.infrastructure.config;

import com.ssafy.paletteme.common.security.exception.CustomDeniedHandler;
import com.ssafy.paletteme.common.security.exception.CustomEntryPoint;
import com.ssafy.paletteme.common.security.filter.JWTFilter;
import com.ssafy.paletteme.common.security.filter.LoginFilter;
import com.ssafy.paletteme.common.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    // AuthenticationManager: 인증 처리를 위해 UserDetailsService, suceess()등의 여러 컴포넌트를 호출.
    private final AuthenticationConfiguration authenticationConfiguration;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    // 공통 예외 처리
    private final CustomDeniedHandler customDeniedHandler;
    private final CustomEntryPoint  customEntryPoint;

    // 비밀번호 암호화
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // CSRF 비활성화
        http.csrf(auth -> auth.disable())
                // CORS 설정 적용
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // Form 로그인 비활성화
                .formLogin(auth -> auth.disable())
                // HTTP Basic 인증 비활성화
                .httpBasic(auth -> auth.disable())
                // 세션 비활성화 (JWT 방식 사용 대비)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 명시한 url만 인가 없이 허용
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                                .requestMatchers("/users/sign-up", "/users/login", "users/phone/send").permitAll()
//                                .requestMatchers("/artworks/**").permitAll()
                                .anyRequest().authenticated());

        http.exceptionHandling( ex -> ex
                .authenticationEntryPoint(customEntryPoint)
                .accessDeniedHandler(customDeniedHandler)
        );

        /* 인증 필터 추가, /api/users/login에서만 해당 필터 작동 */
        LoginFilter loginFilter = new LoginFilter(authenticationConfiguration.getAuthenticationManager(), jwtUtil);
        loginFilter.setFilterProcessesUrl("/users/login");
        http.addFilterAt(loginFilter, UsernamePasswordAuthenticationFilter.class);

        /* 인가 필터 추가 */
        http.addFilterBefore(new JWTFilter(jwtUtil, userDetailsService), LoginFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOriginPattern("*"); // 모든 origin 허용 (개발용)
        config.addAllowedHeader("*");        // 모든 헤더 허용
        config.addAllowedMethod("GET");      // GET 허용  
        config.addAllowedMethod("POST");     // POST 허용
        config.setAllowCredentials(true);    // 자격 증명 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
