package com.ssafy.paletteme.domain.myMuseum.dto;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RecommendResponse {

    private String artworkId;
    private String imgUrl;
    private boolean isLiked;

}
