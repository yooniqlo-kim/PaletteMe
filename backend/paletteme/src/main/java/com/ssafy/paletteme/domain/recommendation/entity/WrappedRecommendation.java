package com.ssafy.paletteme.domain.recommendation.entity;

import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "wrapped_recommendation")
@NoArgsConstructor
@Getter
public class WrappedRecommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "artwork_id", nullable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Artworks artwork;

}
