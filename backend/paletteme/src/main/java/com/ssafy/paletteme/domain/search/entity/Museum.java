package com.ssafy.paletteme.domain.search.entity;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name = "museums")
public class Museum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "museum_id", nullable = false)
    private int museumId;

    @Column(name = "museum_name", nullable = false, length = 100)
    private String museumName;

    @Column(name = "artwork_cnt", nullable = false)
    private Integer artworkCnt;

}
