package com.ssafy.paletteme.domain.reviews.dto;

import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import com.ssafy.paletteme.domain.reviews.entity.Reviews;
import com.ssafy.paletteme.domain.users.entity.Users;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewsWriteRequest {
    private String artworkId;
    private String content;
    private Boolean isPublic = true;

    public Reviews toEntity(Users user, Artworks artworks) {
        return Reviews.builder()
                .user(user)
                .artwork(artworks)
                .content(content)
                .isPublic(isPublic)
                .build();
    }
}
