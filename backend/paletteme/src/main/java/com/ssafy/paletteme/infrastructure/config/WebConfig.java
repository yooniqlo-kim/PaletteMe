package com.ssafy.paletteme.infrastructure.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*") // 모든 Origin 허용 (패턴 기반)
                .allowedMethods("*")        // 모든 HTTP 메서드 허용
                .allowedHeaders("*")        // 모든 헤더 허용
                .allowCredentials(false);   // 인증 정보는 포함하지 않음
    }
}
