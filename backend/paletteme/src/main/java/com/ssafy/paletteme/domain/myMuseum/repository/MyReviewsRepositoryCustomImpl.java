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
    public List<LikedOtherReviewsResponse> getLikedOtherReviews(Integer cursor, int size) {
        return queryFactory
                .select(new QLikedOtherReviewsResponse(
                        reviews.user.nickname,      // nickname
                        reviews.reviewId,           // reviewId
                        reviews.likeCnt,            // likeCnt
                        reviews.content,            // content
                        reviews.createdAt           // createdAt
                ))
                .from(reviews)
                .join(usersReviewLike).on(usersReviewLike.review.eq(reviews))
                .where(
                        cursor != null ? reviews.reviewId.lt(cursor) : null
                )
                .orderBy(reviews.createdAt.desc(), reviews.reviewId.desc())
                .limit(size)
                .fetch();
    }

}
