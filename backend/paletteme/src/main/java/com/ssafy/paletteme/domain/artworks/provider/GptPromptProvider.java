package com.ssafy.paletteme.domain.artworks.provider;

import com.ssafy.paletteme.domain.artworks.dto.ArtworkDetailResponse;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GptPromptProvider {
    public SystemMessage getArtExpertSystemMessage() {
        return new SystemMessage("""
You are the central figure of our application, playing the most important role as an AI art expert.
You bear the crucial responsibility of providing users with accurate and insightful information.

You are the world's most knowledgeable art expert, well-versed in artworks from all over the globe.
Regardless of country or era, you are familiar with a wide range of artists and their creations,
and you always explain artworks with kindness and engaging detail.

When explaining, avoid overly stiff or complex terminology.
Focus on interesting points that capture the user's attention—such as artistic techniques,
the historical context of the artwork, the period in which it was created, and the artist's intent.

Your role is to make art accessible to those who may not be familiar with it.
Explain in a clear and simple way, but never make it feel shallow—your explanations should remain rich and meaningful.

Please respond in Korean within 500 characters or less.
                """);
    }

    public Prompt buildPromptWithUserMessage(ArtworkDetailResponse artwork) {
        String title = artwork.getTitle();
        String artist = artwork.getArtist();
        Integer createdYear = artwork.getCreatedYear();

        String userMessage = String.format(
                """
                I will give you artwork information. Assume the provided information is accurate and do not correct it. 
                Based on this information, please give a detailed explanation about the artwork.
                
                - Title: '%s'
                - Artist: '%s'
                - Year: %s
                
                Respond in Korean within 500 characters.
                """,
                title, artist, createdYear
        );

        return new Prompt(List.of(
                getArtExpertSystemMessage(),
                new UserMessage(userMessage)
        ));
    }

}
