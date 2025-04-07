package com.ssafy.paletteme.domain.myMuseum.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.paletteme.domain.artworks.entity.QArtists;
import com.ssafy.paletteme.domain.artworks.entity.QArtworks;
import com.ssafy.paletteme.domain.artworks.entity.QUsersArtworksLike;
import com.ssafy.paletteme.domain.myMuseum.dto.LikedOtherReviewsResponse;
import com.ssafy.paletteme.domain.myMuseum.dto.MyReviewsResponse;
import com.ssafy.paletteme.domain.myMuseum.dto.QLikedOtherReviewsResponse;
import com.ssafy.paletteme.domain.myMuseum.dto.QMyReviewsResponse;
import com.ssafy.paletteme.domain.reviews.entity.QReviews;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.paletteme.domain.reviews.entity.QUsersReviewLike.usersReviewLike;

@Repository
@RequiredArgsConstructor
public class MyReviewsRepositoryCustomImpl implements MyReviewsRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    QReviews reviews = QReviews.reviews;
    QArtworks artworks = QArtworks.artworks;
    QArtists artists = QArtists.artists;
    QUsersArtworksLike usersArtworksLike = QUsersArtworksLike.usersArtworksLike;

    @Override
    public List<MyReviewsResponse> getMyReviews(int userId, Integer cursor, int size) {
        return queryFactory
                .select(new QMyReviewsResponse(
                        reviews.reviewId,
                        reviews.likeCnt,
                        reviews.content,
                        reviews.createdAt,
                        artworks.artworkId,
                        artworks.originalTitle,
                        artists.originalArtist,
                        artworks.imageUrl,
                        usersArtworksLike.isNotNull() // 좋아요 여부
                ))
                .from(reviews)
                .join(reviews.artwork, artworks)
                .join(artworks.artist, artists)
                .leftJoin(usersArtworksLike)
                .on(usersArtworksLike.user.userId.eq(userId)
                        .and(usersArtworksLike.artwork.artworkId.eq(artworks.artworkId)))
                .where(reviews.user.userId.eq((userId))
                .and(cursor != null ? reviews.reviewId.lt(cursor) : null))
                .orderBy(reviews.createdAt.desc(), reviews.reviewId.desc())
                .limit(size)
                .fetch();

    }

    @Override
    public List<LikedOtherReviewsResponse> getLikedOtherReviews(int userId, Integer cursor, int size) {
        return queryFactory
                .select(new QLikedOtherReviewsResponse(
                        reviews.user.nickname,                  // 작성자 닉네임
                        reviews.reviewId,                       // 리뷰 ID
                        reviews.likeCnt,                        // 좋아요 수
                        reviews.content,                        // 리뷰 내용
                        reviews.createdAt,                      // 작성일
                        reviews.artwork.artworkId,              // 작품 ID
                        reviews.artwork.originalTitle,               // 작품명
                        reviews.artwork.imageUrl,               // 작품 이미지
                        reviews.artwork.artist.originalArtist        // 작가명
                ))
                .from(reviews)
                .join(usersReviewLike).on(usersReviewLike.review.eq(reviews)) // 유저가 좋아요 누른 리뷰
                .join(reviews.artwork, artworks)                              // 리뷰와 연결된 작품
                .join(artworks.artist, artists)                               // 작품의 작가
                .where(
                        usersReviewLike.user.userId.eq(userId),               // 해당 유저의 좋아요
                        cursor != null ? reviews.reviewId.lt(cursor) : null  // 커서 기반 페이징
                )
                .orderBy(reviews.createdAt.desc(), reviews.reviewId.desc())  // 최신순 정렬
                .limit(size)
                .fetch();
    }

}
