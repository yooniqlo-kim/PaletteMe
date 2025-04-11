package com.ssafy.paletteme.domain.ranking.repository;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.paletteme.domain.artworks.entity.QArtworks;
import com.ssafy.paletteme.domain.artworks.entity.QUsersArtworksBookmark;
import com.ssafy.paletteme.domain.artworks.entity.QUsersArtworksLikeCnt;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.core.types.dsl.NumberExpression;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class RankingRepositoryCustomImpl implements RankingRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<String> findTop10Ranking() {
        QArtworks artwork = QArtworks.artworks;
        QUsersArtworksLikeCnt likeCnt = QUsersArtworksLikeCnt.usersArtworksLikeCnt;
        QUsersArtworksBookmark bookmark = QUsersArtworksBookmark.usersArtworksBookmark;

        NumberExpression<Integer> likeCount = Expressions.numberTemplate(
                Integer.class,
                "({0})",
                JPAExpressions.select(likeCnt.likeCnt.coalesce(0))
                        .from(likeCnt)
                        .where(likeCnt.artworkId.eq(artwork.artworkId))
        );

        NumberExpression<Long> bookmarkCount = Expressions.numberTemplate(
                Long.class,
                "({0})",
                JPAExpressions.select(bookmark.count().coalesce(0L))
                        .from(bookmark)
                        .where(bookmark.artwork.artworkId.eq(artwork.artworkId))
        );

        NumberExpression<Integer> totalCount = likeCount.add(bookmarkCount.castToNum(Integer.class));

        return queryFactory
                .select(artwork.korTitle.coalesce(artwork.originalTitle)) // ✅ 조건에 따라 제목 선택
                .from(artwork)
                .orderBy(totalCount.desc())
                .limit(10)
                .fetch();
    }
}
