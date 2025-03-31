package com.ssafy.paletteme.domain.artworks.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArtworkDescriptionResponse {
    private String description;

    private ArtworkDescriptionResponse(String description){
        this.description = description;
    }

    public static ArtworkDescriptionResponse of(String description) {
        return new ArtworkDescriptionResponse(description);
    }
}
