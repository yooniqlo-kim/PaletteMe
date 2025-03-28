package com.ssafy.paletteme.domain.artworks.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArtworkDescriptionResponse {
    private String decription;

    private ArtworkDescriptionResponse(String decription){
        this.decription = decription;
    }

    public static ArtworkDescriptionResponse of(String description) {
        return new ArtworkDescriptionResponse(description);
    }
}
