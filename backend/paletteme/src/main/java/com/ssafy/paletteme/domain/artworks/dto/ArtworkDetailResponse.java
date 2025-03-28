package com.ssafy.paletteme.domain.artworks.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

// @QueryProjection 적용이 안됨.
@Getter
@NoArgsConstructor
@ToString
public class ArtworkDetailResponse {
    private String imgUrl;
    private String museumName;
    private String title;
    private String artist;
    private int createdYear;
    private String description;
    private int like = 0;

    @QueryProjection
    public ArtworkDetailResponse(String imgUrl, String museumName, String title, String artist,
                                 int createdYear, String description) {
        this.imgUrl = imgUrl;
        this.museumName = museumName;
        this.title = title;
        this.artist = artist;
        this.createdYear = createdYear;
        this.description = description;
    }

    public void updateLike(int like) {
        this.like = like;
    }

}
