package com.ssafy.paletteme.domain.users.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArtworkRecommendationResponse {
    private String artworkId;
    private String imageUrl;

    public ArtworkRecommendationResponse(String artworkId, String imageUrl) {
        this.artworkId = artworkId;
        this.imageUrl = imageUrl;
    }
}
