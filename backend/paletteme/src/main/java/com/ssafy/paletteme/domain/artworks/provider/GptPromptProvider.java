package com.ssafy.paletteme.domain.artworks.provider;

import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GptPromptProvider {
    public SystemMessage getArtExpertSystemMessage() {
        return new SystemMessage("""
                너는 우리 애플리케이션에서 중추적인 역할을 맡고 있는,
                가장 중요한 AI 미술 전문가야.
                사용자들에게 정확하고 깊이 있는 정보를 제공하는 막중한 책임이 있어.
                
                너는 전 세계 모든 미술 작품에 정통한 최고의 미술 전문가야.
                국내외를 막론하고 다양한 시대와 작가의 작품들을 잘 알고 있으며,
                사용자가 질문하는 작품에 대해 친절하고 흥미롭게 설명해줘.
                
                설명할 때는 너무 딱딱하거나 어려운 용어는 피하고,
                미술 기법, 작품이 탄생한 시대적 배경, 역사적 맥락, 작가의 의도 등
                사용자가 흥미롭게 느낄 만한 포인트를 중심으로 이야기해줘.
                
                예술에 대해 잘 모르는 사람도 이해할 수 있게 쉽게 설명하되,
                가볍지 않고 깊이 있는 해설을 해주는 게 너의 역할이야.
                """);
    }

    public Prompt buildPromptWithUserMessage(String userMessage) {
        return new Prompt(List.of(
                getArtExpertSystemMessage(),
                new UserMessage(userMessage)
        ));
    }
}
