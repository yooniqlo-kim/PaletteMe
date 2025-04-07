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
import java.util.stream.Collector;
import java.util.stream.Collectors;

/*
TODO: ROW_NUMBER() 쓰고 싶어도 QueryDSL에서는 직접 지원 안 해서 이렇게 자바 후처리를 많이 해야함.
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
//    @Override
//    public List<Tuple> findTopArtistByReviewCount(LocalDateTime startDate, LocalDateTime endDate) {
//        List<Tuple> result = queryFactory
//                .select(
//                        review.user.userId,
//                        artwork.artist.artistId,
//                        artwork.artist.enArtist,
//                        review.reviewId.count()
//                )
//                .from(review)
//                .join(review.artwork, artwork)
//                .join(artwork.artist, artist)
//                .where(review.createdAt.between(startDate, endDate))
//                .groupBy(review.user.userId, artwork.artist.artistId, artwork.artist.enArtist)
//                .fetch();
//
//        return result.stream()
//                .collect(Collectors.groupingBy(
//                        t -> t.get(review.user.userId),
//                        Collectors.collectingAndThen(
//                                Collectors.maxBy(Comparator.comparing(t -> t.get(review.reviewId.count()))),
//                                Optional::get
//                        )
//                ))
//                .values()
//                .stream()
//                .toList();
//    }
    @Override
    public List<Tuple> findTopArtistByReviewCount(LocalDateTime startDate, LocalDateTime endDate) {
        List<Tuple> result = queryFactory
                .select(
                        user.userId,
                        artist.artistId,
                        artist.originalArtist,
                        review.reviewId.count()
                )
                .from(user)
                .leftJoin(review).on(review.user.eq(user)
                        .and(review.createdAt.between(startDate, endDate)))
                .leftJoin(review.artwork, artwork)
                .leftJoin(artwork.artist, artist)
                .groupBy(user.userId, artist.artistId, artist.enArtist)
                .fetch();

        return result.stream()
                .collect(Collectors.groupingBy(
                        t -> t.get(0, Integer.class), // userId 기준으로 그룹핑
                        Collectors.collectingAndThen(
                                Collectors.maxBy(
                                        Comparator.comparing(t -> t.get(3, Long.class)) // 리뷰 수 기준 최대
                                ),
                                optional -> optional.orElse(null) // 없으면 null
                        )
                ))
                .entrySet()
                .stream()
                .map(Map.Entry::getValue) // Tuple만 추출
                .toList();
    }

    @Override
    public List<Tuple> rankUsersByReviewCount(LocalDateTime startDate, LocalDateTime endDate) {
        return queryFactory
                .select(
                        user.userId,
                        review.reviewId.count().coalesce(0L) // null이면 0으로 처리
                )
                .from(user)
                .leftJoin(review).on(review.user.eq(user)
                        .and(review.createdAt.between(startDate, endDate)))
                .groupBy(user.userId)
                .orderBy(review.reviewId.count().coalesce(0L).desc())
                .fetch();
    }

    @Override
    public List<Tuple> findLongestReviewPerUser(LocalDateTime startDate, LocalDateTime endDate) {
        List<Tuple> raw = queryFactory
                .select(
                        user.userId,
                        artwork.artworkId,
                        artwork.originalTitle,
                        review.contentLength,
                        artwork.imageUrl,
                        artist.originalArtist
                )
                .from(user)
                .leftJoin(review).on(review.user.eq(user)
                        .and(review.createdAt.between(startDate, endDate)))
                .leftJoin(review.artwork, artwork)
                .leftJoin(artwork.artist, artist)
                .orderBy(user.userId.asc(), review.contentLength.desc().nullsLast()) // null도 정렬 포함
                .fetch();

        // 유저별 가장 긴 리뷰 하나만 추출
        Map<Integer, Tuple> longestPerUser = new LinkedHashMap<>();
        for (Tuple tuple : raw) {
            Integer userId = tuple.get(0, Integer.class);
            if (!longestPerUser.containsKey(userId)) {
                longestPerUser.put(userId, tuple); // 첫 번째만 저장
            }
        }

        return new ArrayList<>(longestPerUser.values());
    }

//    @Override
//    public List<Tuple> rankUsersByReviewCount(LocalDateTime startDate, LocalDateTime endDate) {
//        return queryFactory
//                .select(
//                        user.userId,
//                        review.reviewId.count()
//                )
//                .from(user)
//                .join(review).on(review.user.eq(user))
//                .where(review.createdAt.between(startDate, endDate))
//                .groupBy(user.userId)
//                .orderBy(review.reviewId.count().desc())
//                .fetch();
//    }

//    // 가장 인상 깊게 본 작품
//    @Override
//    public List<Tuple> findLongestReviewPerUser(LocalDateTime startDate, LocalDateTime endDate) {
//        List<Tuple> raw = queryFactory
//                .select(
//                        review.user.userId,
//                        review.artwork.artworkId,
//                        artwork.originalTitle,
//                        review.contentLength,
//                        artwork.imageUrl,
//                        artwork.artist.originalArtist
//                )
//                .from(review)
//                .join(review.artwork, artwork)
//                .join(artwork.artist, artist)
//                .where(review.createdAt.between(startDate, endDate))
//                .orderBy(review.user.userId.asc(), review.contentLength.desc())
//                .fetch();
//
//        // 후처리: 유저별 가장 긴 리뷰 하나만 추출
//        Map<Integer, Tuple> longestPerUser = new LinkedHashMap<>();
//        for (Tuple tuple : raw) {
//            Integer userId = tuple.get(review.user.userId);
//            if (!longestPerUser.containsKey(userId)) {
//                longestPerUser.put(userId, tuple);
//            }
//        }
//        return new ArrayList<>(longestPerUser.values());
//    }
}
