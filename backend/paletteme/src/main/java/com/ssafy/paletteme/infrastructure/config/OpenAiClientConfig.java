package com.ssafy.paletteme.infrastructure.config;

import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAiClientConfig {
    @Value("${spring.ai.openai.api-key}")
    private String apiKey;

    @Value("${chatgpt.model}")
    private String model;

    @Value("${chatgpt.temprature}")
    private float temperature;

    @Value("${chatgpt.max.tokens}")
    private int maxTokens;

    // OpenAI API와 통신하는 핵심 컴포넌트
    @Bean
    public OpenAiApi openAiApi() {
        return new OpenAiApi(apiKey);
    }

    // OpenAI의 GPT 모델을 챗봇처럼 호출할 수 있게 해주는 핵심 컴포넌트
    @Bean
    public OpenAiChatClient openAiChatClient(OpenAiApi openAiApi) {
        OpenAiChatOptions options = OpenAiChatOptions.builder()
                .withModel(model)
                .withTemperature(temperature) // 창의성 정도 0.0 ~ 1.0
                .withMaxTokens(maxTokens) // 최대 응답 길이
                .build();

        return new OpenAiChatClient(openAiApi, options);
    }
}
