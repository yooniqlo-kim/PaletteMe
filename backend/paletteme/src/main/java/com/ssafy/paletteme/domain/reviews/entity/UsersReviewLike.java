package com.ssafy.paletteme.domain.reviews.entity;

import com.ssafy.paletteme.domain.users.entity.Users;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "users_review_like")
public class UsersReviewLike {
    @Id
    @Column(name = "users_review_like_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userReviewLikeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id",
            nullable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Reviews review;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",
            nullable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Users user;
}
