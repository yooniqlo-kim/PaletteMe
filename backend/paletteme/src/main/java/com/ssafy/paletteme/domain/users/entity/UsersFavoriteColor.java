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
    private Users users;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "color_id",
            insertable = false,
            updatable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT)
    )
    private Color color;

    private UsersFavoriteColor(Users users, Color color) {
        this.users = users;
        this.color = color;
    }

    public static UsersFavoriteColor of(Users users, Color color) {
        return new UsersFavoriteColor(users, color);
    }
}
