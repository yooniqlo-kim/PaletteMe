package com.ssafy.paletteme.domain.users.entity.id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class UsersFavoriteColorId {
    private Integer user;
    private Integer color;
}
