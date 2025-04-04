package com.ssafy.paletteme.domain.artworks.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Getter
@NoArgsConstructor
@ToString
public class ArtworkDetailResponse {
    private String artworkId;
    private String imgUrl;
    private String museumName;
    private String title;
    private String artist;
    private int createdYear;
    private String description;
    private int like = 0;
    private Boolean isLiked;
    private Boolean isBookMarked;
    private Integer myReviewId;

    @QueryProjection
    public ArtworkDetailResponse(String artworkId, String imgUrl, String museumName, String title, String artist,
                                 int createdYear, String description) {
        this.artworkId = artworkId;
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

    public void isLiked(boolean isLiked) {
        this.isLiked = isLiked;
    }

    public void isBookMarked(boolean isBookMarked) {
        this.isBookMarked = isBookMarked;
    }

    public void updateMyReviewId(Integer myReviewId) {
        this.myReviewId = myReviewId;
    }

}
