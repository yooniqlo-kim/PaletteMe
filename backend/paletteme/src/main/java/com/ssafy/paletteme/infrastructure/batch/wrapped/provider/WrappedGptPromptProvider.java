package com.ssafy.paletteme.infrastructure.batch.wrapped.provider;

import com.ssafy.paletteme.domain.recommendation.dto.WrappedRecommendationDto;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;

import java.util.List;

public class WrappedGptPromptProvider {

    public static SystemMessage getArtExpertSystemMessage() {
        return new SystemMessage("""
            You are the central figure of our application, serving as an AI art expert.
            You play a crucial role in recommending artworks that align with user preferences.

            You are deeply knowledgeable about art across all periods and cultures.
            Given a list of artworks and a user's favorite piece, select one artwork from the list 
            that best matches the user's taste.

            Respond only with the title of the selected artwork.
            Do **not** include any explanation or additional text.
            The response must be in Korean, within a single line.
        """);
    }

    public static Prompt buildPromptForRecommendation(
            List<WrappedRecommendationDto> candidates,
            String userFavoriteTitle
    ) {
        StringBuilder builder = new StringBuilder();

        if (userFavoriteTitle == null || userFavoriteTitle.isBlank()) {
            userFavoriteTitle = "No information about the user's favorite artwork is available. However, choose one artwork ONLY from the list below based on your judgment.";
        }

        builder.append("User's favorite artwork title:\n");
        builder.append(userFavoriteTitle).append("\n\n");

        builder.append("Here are 30 candidate artworks:\n");
        for (int i = 0; i < candidates.size(); i++) {
            WrappedRecommendationDto art = candidates.get(i);
            builder.append(String.format("%d. %s\n", i + 1, art.getArtwork()));
        }

        builder.append("""
        
        You MUST choose exactly one title from the list above.
        Do NOT create a new title, translate, or modify any title. Just copy one title exactly as shown.
        Respond only with the title in Korean. No explanation, no extra text.
        """);

        return new Prompt(List.of(
                getArtExpertSystemMessage(),
                new UserMessage(builder.toString())
        ));
    }
}