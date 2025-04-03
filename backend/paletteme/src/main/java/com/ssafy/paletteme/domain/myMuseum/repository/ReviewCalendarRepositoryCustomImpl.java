package com.ssafy.paletteme.domain.myMuseum.repository;

import com.querydsl.core.types.dsl.DateTimeExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.paletteme.domain.artworks.entity.QArtworks;
import com.ssafy.paletteme.domain.myMuseum.dto.MonthlyReviewResponse;
import com.ssafy.paletteme.domain.myMuseum.dto.QMonthlyReviewResponse;
import com.ssafy.paletteme.domain.myMuseum.dto.QWeeklyReviewResponse;
import com.ssafy.paletteme.domain.myMuseum.dto.WeeklyReviewResponse;
import com.ssafy.paletteme.domain.reviews.entity.QReviews;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReviewCalendarRepositoryCustomImpl implements ReviewCalendarRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    QReviews reviews = QReviews.reviews;
    QArtworks artworks = QArtworks.artworks;

    @Override
    public List<MonthlyReviewResponse> getMonthlyReviewCalendar(int userId, int year, int month) {
        LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime end = start.withDayOfMonth(start.toLocalDate().lengthOfMonth())
                .withHour(23).withMinute(59).withSecond(59);

        // 날짜 비교 기준: updatedAt이 null이면 createdAt 사용
        DateTimeExpression<LocalDateTime> dateCriteria = reviews.updatedAt.coalesce(reviews.createdAt);

        return queryFactory
                .select(new QMonthlyReviewResponse(
                        reviews.reviewId,
                        reviews.createdAt,
                        artworks.imageUrl
                ))
                .from(reviews)
                .join(reviews.artwork, artworks)
                .where(
                        reviews.user.userId.eq(userId),
                        dateCriteria.between(start, end)
                )
                .orderBy(reviews.createdAt.asc())
                .fetch();
    }

    @Override
    public List<WeeklyReviewResponse> getWeeklyReviewCalendar(int userId, LocalDate startDate, LocalDate endDate) {
        LocalDateTime start = startDate.atStartOfDay(); // 00:00:00
        LocalDateTime end = endDate.atTime(23, 59, 59);

        // 날짜 비교 기준: updatedAt이 null이면 createdAt 사용
        DateTimeExpression<LocalDateTime> dateCriteria = reviews.updatedAt.coalesce(reviews.createdAt);

        return queryFactory
                .select(new QWeeklyReviewResponse(
                        reviews.reviewId,
                        reviews.createdAt,
                        artworks.imageUrl
                ))
                .from(reviews)
                .join(reviews.artwork, artworks)
                .where(
                        reviews.user.userId.eq(userId),
                        dateCriteria.between(start, end)
                )
                .orderBy(reviews.createdAt.asc())
                .fetch();
    }
}
