package com.ssafy.paletteme.domain.myMuseum.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "artworks_recommend_age")
public class ArtworksRecommendAge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recommend_age_id")
    private Long id;

    @Column(name = "artwork_id", nullable = false)
    private String artworkId;

    @Column(name = "age_group", nullable = false)
    private int ageGroup;

    public static ArtworksRecommendAge of(String artworkId, int ageGroup) {
        ArtworksRecommendAge entity = new ArtworksRecommendAge();
        entity.artworkId = artworkId;
        entity.ageGroup = ageGroup;
        return entity;
    }

}