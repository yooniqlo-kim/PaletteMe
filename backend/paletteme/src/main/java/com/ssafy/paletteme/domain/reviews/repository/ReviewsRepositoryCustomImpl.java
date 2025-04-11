package com.ssafy.paletteme.domain.reviews.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
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
                        artworks.originalTitle,
                        artists.originalArtist,
                        users.s3Url,
                        users.nickname,
                        reviews.createdAt.stringValue(),
                        reviews.content,
                        reviews.likeCnt,
                        reviews.isPublic,
                        artworks.artworkId
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
                        usersReviewLike.isNotNull(), // 좋아요 여부
                        reviews.isPublic
                ))
                .from(reviews)
                .join(reviews.user, users)
                .leftJoin(usersReviewLike)
                .on(usersReviewLike.user.userId.eq(userId)
                        .and(usersReviewLike.review.reviewId.eq(reviews.reviewId)))
                .where(
                        reviews.artwork.artworkId.eq(artworkId),
                        reviews.isPublic.eq(true),
                        reviews.user.userId.ne(userId),
                        cursor != null ? reviews.reviewId.lt(cursor.longValue()) : null
                )
                .orderBy(reviews.reviewId.desc()) // 여기만 심플하게 바꿈
                .limit(size)
                .fetch();
    }

    @Override
    public ReviewSummaryResponse findMyReview(int userId, String artworkId) {
        return queryFactory
                .select(new QReviewSummaryResponse(
                        reviews.reviewId,
                        users.nickname,
                        users.s3Url,
                        reviews.createdAt.stringValue(),
                        reviews.content,
                        reviews.likeCnt,
                        usersReviewLike.isNotNull(),
                        reviews.isPublic
                ))
                .from(reviews)
                .join(reviews.user, users)
                .leftJoin(usersReviewLike)
                .on(usersReviewLike.user.userId.eq(userId)
                        .and(usersReviewLike.review.reviewId.eq(reviews.reviewId)))
                .where(
                        reviews.artwork.artworkId.eq(artworkId),
                        reviews.user.userId.eq(userId)
                )
                .orderBy(reviews.reviewId.desc())
                .fetchOne();
    }

    private BooleanExpression gtCursor(Integer cursor) {
        if (cursor == null || cursor == 0) {
            return null;
        }
        return reviews.reviewId.gt(cursor); // reviewId > cursor
    }
}
