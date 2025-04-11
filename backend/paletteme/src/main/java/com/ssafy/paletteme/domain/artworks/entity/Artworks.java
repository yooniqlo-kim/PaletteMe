package com.ssafy.paletteme.domain.artworks.entity;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "artworks")
public class Artworks {
    @Id
    @Column(name = "artwork_id", nullable = false, length = 255)
    private String artworkId;

    // 연관 엔티티 참조 (외래키 제약 없이)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "museum_id",
            nullable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Museums museum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "era_id",
            nullable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Eras era;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "artist_id",
            nullable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Artists artist;

    @Column(name = "original_title", nullable = false, length = 255)
    private String originalTitle;

    @Column(name = "en_title", length = 255)
    private String enTitle;

    @Column(name = "kor_title", length = 255)
    private String korTitle;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "country_origin", length = 100)
    private String countryOrigin;

    @Column(name = "created_year")
    private Integer createdYear;

    @Column(name = "materials", columnDefinition = "TEXT")
    private String materials;

    @Column(name = "color", length = 20)
    private String color;

}
