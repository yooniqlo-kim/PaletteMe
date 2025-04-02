package com.ssafy.paletteme.domain.wrapped.service;

import com.ssafy.paletteme.domain.wrapped.dto.WrappedResponse;
import com.ssafy.paletteme.domain.wrapped.entity.Wrapped;
import com.ssafy.paletteme.domain.wrapped.repository.WrappedRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class WrappedService {
    private final WrappedRepository wrappedRepository;

    @Transactional(readOnly = true)
    public WrappedResponse getWrappedData(int userId) {
        Wrapped wrapped = wrappedRepository.findByUserId(userId)
                .orElse(null);

        return WrappedResponse.of(wrapped);
    }


    public void printTopArtistsByUser(LocalDateTime start, LocalDateTime end) {
        wrappedRepository.findTopArtistByReviewCount(start, end).forEach(t -> {
            int userId = t.get(0, Integer.class);
            String artistId = t.get(1, String.class);
            int reviewCount = t.get(2, Integer.class);
        });

    }

    public void printUserReviewRank(LocalDateTime start, LocalDateTime end) {
        wrappedRepository.rankUsersByReviewCount(start, end).forEach(t -> {
            int userId = t.get(0, Integer.class);
            int reviewCount = t.get(1, Integer.class);
        });

    }

    public void printLongestReviewPerUser(LocalDateTime start, LocalDateTime end) {
        wrappedRepository.findLongestReviewPerUser(start, end).forEach(t -> {
            int userId = t.get(0, Integer.class);
            String artworkId = t.get(1, String.class);
            Integer contentLength = t.get(2, Integer.class);
        });

    }
}
