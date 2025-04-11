package com.ssafy.paletteme.domain.artworks.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "artists")
public class Artists {

    @Id
    @Column(name = "artist_id", nullable = false)
    private int artistId;

    @Column(name = "original_artist", nullable = false, length = 100)
    private String originalArtist;

    @Column(name = "kor_artist", length = 30)
    private String korArtist;

    @Column(name = "en_artist", length = 100)
    private String enArtist;

}
