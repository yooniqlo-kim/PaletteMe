package com.ssafy.paletteme.domain.reviews.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.paletteme.domain.artworks.entity.QArtists;
import com.ssafy.paletteme.domain.artworks.entity.QArtworks;
import com.ssafy.paletteme.domain.artworks.entity.QMuseums;
import com.ssafy.paletteme.domain.reviews.dto.QReviewSummaryResponse;
import com.ssafy.paletteme.domain.reviews.dto.QReviewsWithArtworkResponses;
import com.ssafy.paletteme.domain.reviews.dto.ReviewSummaryResponse;
import com.ssafy.paletteme.domain.reviews.dto.ReviewsWithArtworkResponses;
import com.ssafy.paletteme.domain.reviews.entity.QReviews;
import com.ssafy.paletteme.domain.reviews.entity.QUsersReviewLike;
import com.ssafy.paletteme.domain.users.entity.QUsers;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReviewsRepositoryCustomImpl implements ReviewsRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    QReviews reviews = QReviews.reviews;
    QArtworks artworks =  QArtworks.artworks;
    QMuseums museums =  QMuseums.museums;
    QArtists artists =  QArtists.artists;
    QUsers users =  QUsers.users;
    QUsersReviewLike  usersReviewLike = QUsersReviewLike.usersReviewLike;

    @Override
    public ReviewsWithArtworkResponses getReviewsWithArtworkResponses(int reviewId) {
        return queryFactory
                .select(new QReviewsWithArtworkResponses(
                        artworks.imageUrl,
                        museums.museumName,
                        artworks.enTitle,
                        artists.enArtist,
                        users.s3Url,
                        reviews.createdAt.stringValue(),
                        reviews.content,
                        reviews.likeCnt
                ))
                .from(reviews)
                .join(reviews.artwork, artworks)
                .join(artworks.museum, museums)
                .join(artworks.artist, artists)
                .join(reviews.user, users)
                .where(reviews.reviewId.eq(reviewId))
                .fetchOne();
    }


    @Override
    public List<ReviewSummaryResponse> findReviewsWithPaging(String artworkId, Integer cursor, int size, int userId) {
        return queryFactory
                .select(new QReviewSummaryResponse(
                        reviews.reviewId,
                        users.nickname,
                        users.s3Url,
                        reviews.createdAt.stringValue(),
                        reviews.content,
                        reviews.likeCnt,
                        usersReviewLike.isNotNull() // 좋아요 여부
                ))
                .from(reviews)
                .join(reviews.user, users)
                .leftJoin(usersReviewLike)
                .on(usersReviewLike.user.userId.eq(userId)
                        .and(usersReviewLike.review.reviewId.eq(reviews.reviewId)))
                .where(
                        reviews.artwork.artworkId.eq(artworkId),
                        reviews.isPublic.eq(true),
                        cursor != null ? reviews.reviewId.lt(cursor.longValue()) : null
                )
                .orderBy(reviews.reviewId.desc())
                .limit(size)
                .fetch();
    }

    private BooleanExpression gtCursor(Integer cursor) {
        if (cursor == null || cursor == 0) {
            return null;
        }
        return reviews.reviewId.gt(cursor); // reviewId > cursor
    }
}
