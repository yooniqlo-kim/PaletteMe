package com.ssafy.paletteme.domain.users.entity;

import com.ssafy.paletteme.domain.users.entity.id.UsersFavoriteColorId;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@IdClass(UsersFavoriteColorId.class)
@Table(name = "users_favorite_color")
public class UsersFavoriteColor {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            insertable = false,
            updatable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT)
    )
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "color_id",
            insertable = false,
            updatable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT)
    )
    private Color color;
}
