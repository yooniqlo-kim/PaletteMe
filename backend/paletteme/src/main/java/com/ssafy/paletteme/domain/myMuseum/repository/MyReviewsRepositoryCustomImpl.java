package com.ssafy.paletteme.domain.myMuseum.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.paletteme.domain.myMuseum.dto.MyReviewsResponse;
import com.ssafy.paletteme.domain.myMuseum.dto.QMyReviewsResponse;
import com.ssafy.paletteme.domain.reviews.entity.QReviews;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MyReviewsRepositoryCustomImpl implements MyReviewsRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    QReviews reviews = QReviews.reviews;
    @Override
    public List<MyReviewsResponse> getMyReviews(int userId, Integer cursor, int size) {
        return queryFactory
                .select(new QMyReviewsResponse(
                        reviews.reviewId,
                        reviews.likeCnt,
                        reviews.content,
                        reviews.createdAt
                ))
                .from(reviews)
                .where(reviews.user.userId.eq((userId))
                .and(cursor != null ? reviews.reviewId.lt(cursor) : null))
                .orderBy(reviews.createdAt.desc(), reviews.reviewId.desc())
                .limit(size)
                .fetch();

    }
}
