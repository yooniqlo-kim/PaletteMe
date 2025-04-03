package com.ssafy.paletteme.domain.artworks.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name = "users_artworks_like_cnt")
@Getter
public class UsersArtworksLikeCnt {
    @Id
    @Column(name = "artwork_id", length = 255, nullable = false)
    private String artworkId;

    @Column(name = "like_cnt", nullable = true)
    private Integer likeCnt = 0;

    public static UsersArtworksLikeCnt of(String artworkId) {
        UsersArtworksLikeCnt likeCnt = new UsersArtworksLikeCnt();
        likeCnt.artworkId = artworkId;
        likeCnt.likeCnt = 0;
        return likeCnt;
    }

    public void increaseLikeCnt() {
        this.likeCnt = this.likeCnt + 1;
    }

    public void decreaseLikeCnt() {
        if (this.likeCnt > 0) {
            this.likeCnt = this.likeCnt - 1;
        }
    }
}
