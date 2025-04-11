package com.ssafy.paletteme.domain.wrapped.repository;

import com.querydsl.core.Tuple;

import java.time.LocalDateTime;
import java.util.List;

public interface WrapedRepositoyCustom {
    List<Tuple> findTopArtistByReviewCount(LocalDateTime startDate, LocalDateTime endDate);

    List<Tuple> rankUsersByReviewCount(LocalDateTime startDate, LocalDateTime endDate);

    List<Tuple> findLongestReviewPerUser(LocalDateTime startDate, LocalDateTime endDate);
}
