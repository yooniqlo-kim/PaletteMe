package com.ssafy.paletteme.domain.recommendation.dto;

import com.ssafy.paletteme.domain.recommendation.entity.WrappedRecommendation;
import lombok.Getter;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

@Getter
@ToString
public class WrappedRecommendationDto implements Serializable {
    private static final long serialVersionUID = 1L;

    private final String artist;
    private final String artwork;
    private final String imageUrl;

    private WrappedRecommendationDto(String artist, String artwork, String imageUrl) {
        this.artist = artist;
        this.artwork = artwork;
        this.imageUrl = imageUrl;
    }

    public static WrappedRecommendationDto fromEntity(WrappedRecommendation entity) {
        return new WrappedRecommendationDto(
                entity.getArtwork().getArtist().getOriginalArtist(),
                entity.getArtwork().getOriginalTitle(),
                entity.getArtwork().getImageUrl()
        );
    }

    // WrappedRecommendation 엔티티 리스트를 DTO 리스트로 변환
    public static List<WrappedRecommendationDto> fromEntityList(List<WrappedRecommendation> entities) {
        return entities.stream()
                .map(WrappedRecommendationDto::fromEntity)
                .toList();
    }

}
