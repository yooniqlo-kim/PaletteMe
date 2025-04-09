package com.ssafy.paletteme.domain.wrapped.entity;

import com.ssafy.paletteme.domain.artworks.entity.Artists;
import com.ssafy.paletteme.domain.users.entity.Users;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "wrapped")
@Getter
@NoArgsConstructor
public class Wrapped {

    @Id
    private int userId;

    @MapsId // userId를 PK + FK로 사용
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id",
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT)) //db 컬럼명으로 명시, Users에는 userId로 되있음.
    private Users users;

    @Column(name = "artist_name")
    private String artistName;

    @Column(name = "review_rank")
    private Integer reviewRank;

    @Column(name = "review_percentage")
    private Integer reviewPercentage;

    @Column(name = "review_cnt")
    private Integer reviewCnt;

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
}
