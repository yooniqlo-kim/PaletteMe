package com.ssafy.paletteme.infrastructure.config;

import com.ssafy.paletteme.common.security.resolver.LoginUserResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final LoginUserResolver loginUserResolver;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*") // 모든 Origin 허용 (패턴 기반)
                .allowedMethods("*")        // 모든 HTTP 메서드 허용
                .allowedHeaders("*")        // 모든 헤더 허용
                .allowCredentials(false);   // 인증 정보는 포함하지 않음
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(loginUserResolver);
    }
}
