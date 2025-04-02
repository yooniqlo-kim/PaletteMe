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
}
