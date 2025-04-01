package com.ssafy.paletteme.domain.myMuseum.repository;

import com.querydsl.core.types.dsl.DateTimeExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.paletteme.domain.myMuseum.dto.QReviewCalendarResponse;
import com.ssafy.paletteme.domain.myMuseum.dto.ReviewCalendarResponse;
import com.ssafy.paletteme.domain.reviews.entity.QReviews;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReviewCalendarRepositoryCustomImpl implements ReviewCalendarRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    QReviews reviews = QReviews.reviews;
    @Override
    public List<ReviewCalendarResponse> findReviewsByUserAndMonth(int userId, int year, int month) {
        LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime end = start.withDayOfMonth(start.toLocalDate().lengthOfMonth())
                .withHour(23).withMinute(59).withSecond(59);

        // 날짜 비교 기준: updatedAt이 null이면 createdAt 사용
        DateTimeExpression<LocalDateTime> dateCriteria = reviews.updatedAt.coalesce(reviews.createdAt);

        return queryFactory
                .select(new QReviewCalendarResponse(
                        reviews.reviewId,
                        reviews.updatedAt,
                        reviews.artwork.artworkId,
                        reviews.content
                ))
                .from(reviews)
                .where(
                        reviews.user.userId.eq(userId),
                        dateCriteria.between(start, end)
                )
                .orderBy(reviews.createdAt.asc())
                .fetch();
    }
}
