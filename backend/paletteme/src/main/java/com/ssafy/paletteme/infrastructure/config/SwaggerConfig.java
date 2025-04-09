package com.ssafy.paletteme.infrastructure.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Slf4j
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                // accessToken을 헤더에 담아 사용
                .components(new Components()
                        .addSecuritySchemes("Authorization", new SecurityScheme()
                                .type(SecurityScheme.Type.APIKEY)
                                .name("Authorization")
                                .in(SecurityScheme.In.HEADER)))
                .security(List.of(new SecurityRequirement().addList("Authorization")))
                .info(new Info()
                        .title("Paletteme API")
                        .version("1.0.0")
                        .description("This is the API documentation for our project!"));
    }
}
