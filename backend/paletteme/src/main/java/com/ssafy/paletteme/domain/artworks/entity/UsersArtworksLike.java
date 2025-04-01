package com.ssafy.paletteme.domain.artworks.entity;

import com.ssafy.paletteme.domain.users.entity.Users;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "users_artworks_like")
public class UsersArtworksLike {
    @Id
    @Column(name = "user_artwork_like_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userArtworkLikeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",
            nullable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artwork_id",
            nullable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Artworks artwork;
}
