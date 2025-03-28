package com.ssafy.paletteme.domain.artworks.entity;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name = "eras")
public class Eras {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "era_id", nullable = false)
    private int eraId;

    @Column(name = "era", nullable = false, length = 30)
    private String era;

    @Column(name = "era_cnt", nullable = false)
    private Integer eraCnt;

}
