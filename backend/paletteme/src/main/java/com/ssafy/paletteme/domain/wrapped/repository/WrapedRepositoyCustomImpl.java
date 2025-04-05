package com.ssafy.paletteme.domain.wrapped.repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.paletteme.domain.artworks.entity.QArtists;
import com.ssafy.paletteme.domain.artworks.entity.QArtworks;
import com.ssafy.paletteme.domain.reviews.entity.QReviews;
import com.ssafy.paletteme.domain.users.entity.QUsers;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/*
ROW_NUMBER() 쓰고 싶어도 QueryDSL에서는 직접 지원 안 해서 이렇게 자바 후처리를 많이 해야함.
만약 유저가 수천 명 이상이면, 쿼리에서 아예 ROW_NUMBER()를 사용하는 [native SQL]가 [JPQL + DTO] 조합이 더 효율적
추후에 변경하기
*/
@Repository
@RequiredArgsConstructor
public class WrapedRepositoyCustomImpl implements WrapedRepositoyCustom {
    private final JPAQueryFactory queryFactory;

    QReviews review = QReviews.reviews;
    QArtworks artwork = QArtworks.artworks;
    QUsers user = QUsers.users;
    QArtists artist = QArtists.artists;

    // 최애 화가
    @Override
    public List<Tuple> findTopArtistByReviewCount(LocalDateTime startDate, LocalDateTime endDate) {
        List<Tuple> result = queryFactory
                .select(
                        review.user.userId,
                        artwork.artist.artistId,
                        artwork.artist.enArtist,
                        review.reviewId.count()
                )
                .from(review)
                .join(review.artwork, artwork)
                .join(artwork.artist, artist)
                .where(review.createdAt.between(startDate, endDate))
                .groupBy(review.user.userId, artwork.artist.artistId, artwork.artist.enArtist)
                .fetch();

        return result.stream()
                .collect(Collectors.groupingBy(
                        t -> t.get(review.user.userId),
                        Collectors.collectingAndThen(
                                Collectors.maxBy(Comparator.comparing(t -> t.get(review.reviewId.count()))),
                                Optional::get
                        )
                ))
                .values()
                .stream()
                .toList();
    }


    @Override
    public List<Tuple> rankUsersByReviewCount(LocalDateTime startDate, LocalDateTime endDate) {
        return queryFactory
                .select(
                        user.userId,
                        review.reviewId.count()
                )
                .from(user)
                .join(review).on(review.user.eq(user))
                .where(review.createdAt.between(startDate, endDate))
                .groupBy(user.userId)
                .orderBy(review.reviewId.count().desc())
                .fetch();
    }

    // 가장 인상 깊게 본 작품
    @Override
    public List<Tuple> findLongestReviewPerUser(LocalDateTime startDate, LocalDateTime endDate) {
        List<Tuple> raw = queryFactory
                .select(
                        review.user.userId,
                        review.artwork.artworkId,
                        artwork.enTitle,
                        review.contentLength
                )
                .from(review)
                .join(review.artwork, artwork)
                .where(review.createdAt.between(startDate, endDate))
                .orderBy(review.user.userId.asc(), review.contentLength.desc())
                .fetch();

        // 후처리: 유저별 가장 긴 리뷰 하나만 추출
        Map<Integer, Tuple> longestPerUser = new LinkedHashMap<>();
        for (Tuple tuple : raw) {
            Integer userId = tuple.get(review.user.userId);
            if (!longestPerUser.containsKey(userId)) {
                longestPerUser.put(userId, tuple);
            }
        }
        return new ArrayList<>(longestPerUser.values());
    }
}
