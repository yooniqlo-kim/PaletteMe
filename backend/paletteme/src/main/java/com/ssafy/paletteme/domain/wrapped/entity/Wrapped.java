package com.ssafy.paletteme.domain.wrapped.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "wrapped")
@Getter
@NoArgsConstructor
public class Wrapped {
    @Id
    private int userId;

    @Column(name = "artist_name")
    private String artistName;

    @Column(name = "review_rank")
    private Integer reviewRank;

    @Column(name = "review_percentage")
    private Integer reviewPercentage;

    @Column(name = "review_cnt")
    private Integer reviewCnt;

    // 감상평 수 기반 최야 작품명, 화가명, 이미지
    @Column(name = "favorite_name")
    private String favoriteName;

    @Column(name = "favorite_artist")
    private String favoriteArtist;

    @Column(name = "favorite_img")
    private String favoriteImg;

    @Column(name = "recommended_artwork")
    private String recommendedArtwork;

    @Column(name = "recommended_artist")
    private String recommendedArtist;

    @Column(name = "recommended_img")
    private String recommendedImg;

    @Builder
    public Wrapped(int userId, String artistName,
                   Integer reviewRank, Integer reviewPercentage, Integer reviewCnt,
                   String favoriteName, String favoriteArtist, String favoriteImg,
                   String recommendedArtwork, String recommendedArtist, String recommendedImg) {
        this.userId = userId;
        this.artistName = artistName;
        this.reviewRank = reviewRank;
        this.reviewPercentage = reviewPercentage;
        this.reviewCnt = reviewCnt;
        this.favoriteName = favoriteName;
        this.favoriteArtist = favoriteArtist;
        this.favoriteImg = favoriteImg;
        this.recommendedArtwork = recommendedArtwork;
        this.recommendedArtist = recommendedArtist;
        this.recommendedImg = recommendedImg;
    }
}
