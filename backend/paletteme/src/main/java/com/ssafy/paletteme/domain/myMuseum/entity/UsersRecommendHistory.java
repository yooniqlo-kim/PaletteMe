package com.ssafy.paletteme.domain.myMuseum.entity;

import com.ssafy.paletteme.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Builder;

import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users_recommend_history")
public class UsersRecommendHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "artwork_id", nullable = false)
    private String artworkId;

    @Column(name = "recommended_at", nullable = false)
    private LocalDateTime recommendedAt;

    @Column(name = "recommendation_type")
    private String recommendationType;

    @Builder
    public UsersRecommendHistory(Integer userId, String artworkId, LocalDateTime recommendedAt, String recommendationType) {
        this.userId = userId;
        this.artworkId = artworkId;
        this.recommendedAt = recommendedAt;
        this.recommendationType = recommendationType;
    }

    public static UsersRecommendHistory of(Integer userId, String artworkId, String recommendationType) {
        return UsersRecommendHistory.builder()
                .userId(userId)
                .artworkId(artworkId)
                .recommendedAt(LocalDateTime.now())
                .recommendationType(recommendationType)
                .build();
    }

}
