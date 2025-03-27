package com.ssafy.paletteme.domain.search.entity;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name = "artists")
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artist_id", nullable = false)
    private int artistId;

    @Column(name = "kor_artist", nullable = false, length = 30)
    private String korArtist;

    @Column(name = "en_artist", nullable = false, length = 100)
    private String enArtist;

}
