package com.ssafy.paletteme.domain.reviews.entity;

import com.ssafy.paletteme.common.entity.BaseEntity;
import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import com.ssafy.paletteme.domain.users.entity.Users;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "reviews")
public class Reviews extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Integer reviewId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artwork_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Artworks artwork;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    // TINYINT(1)로 매핑.
    @Column(name = "is_public", nullable = false)
    private Boolean isPublic = true;

    @Column(name = "like_cnt")
    private Integer likeCnt = 0;


    @Builder
    public Reviews(Users user, Artworks artwork, String content, Boolean isPublic) {
        this.user = user;
        this.artwork = artwork;
        this.content = content;
        this.isPublic = isPublic;
    }

    // content 데이터를 정형화해야 한다면 추가하기
    @PrePersist
    public void prePersist() {
        if (this.content == null) {
            this.content = "";
        }
        if (this.likeCnt == null){
            this.likeCnt = 0;
        }
    }

    public void updateContent(String content, Boolean isPublic) {
        this.content = content;
        this.isPublic = isPublic;
    }
}
