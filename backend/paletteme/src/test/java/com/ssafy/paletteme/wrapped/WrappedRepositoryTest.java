package com.ssafy.paletteme.wrapped;

import com.querydsl.core.Tuple;
import com.ssafy.paletteme.domain.wrapped.repository.WrappedRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;


@SpringBootTest
public class WrappedRepositoryTest {

    @Autowired
    private WrappedRepository wrappedRepository;

    @Test
    void testFindTopArtistByReviewCount() {
        LocalDateTime start = LocalDateTime.of(2025, 3, 1, 0, 0);
        LocalDateTime end = LocalDateTime.of(2025, 3, 31, 23, 59);

        List<Tuple> result = wrappedRepository.findTopArtistByReviewCount(start, end);

        System.out.println("가장 좋아하는 작가");
        for (Tuple tuple : result) {
            int userId = tuple.get(0, Integer.class);
            int artistId = tuple.get(1, Integer.class);
            String enArtist =  tuple.get(2, String.class);
            long count = tuple.get(3, Long.class);


            System.out.println("userId: " + userId + ", artistId: " + artistId + ", reviewCount: " + count + ", enArtist: " + enArtist);
        }
    }

    @Test
    void testRankUsersByReviewCount() {
        LocalDateTime start = LocalDateTime.of(2025, 3, 1, 0, 0);
        LocalDateTime end = LocalDateTime.of(2025, 3, 31, 23, 59);

        List<Tuple> result = wrappedRepository.rankUsersByReviewCount(start, end);

        System.out.println("리뷰 수 개수");
        for (Tuple tuple : result) {
            int userId = tuple.get(0, Integer.class);
            long reviewCount = tuple.get(1, Long.class);
            System.out.println("userId: " + userId + ", reviewCount: " + reviewCount);
        }
    }

    @Test
    void testFindLongestReviewPerUser() {
        LocalDateTime start = LocalDateTime.of(2025, 3, 1, 0, 0);
        LocalDateTime end = LocalDateTime.of(2025, 3, 31, 23, 59);

        List<Tuple> result = wrappedRepository.findLongestReviewPerUser(start, end);

        System.out.println("가장 리뷰를 길게 남긴 글(인상 깊은 작품)");
        for (Tuple tuple : result) {
            int userId = tuple.get(0, Integer.class);
            String artworkId = tuple.get(1, String.class);
            String enTitle = tuple.get(2, String.class);
            int contentLength = tuple.get(3, Integer.class);
            System.out.println("userId: " + userId + ", artworkId: " + artworkId + ", contentLength: " + contentLength + ", entitle: " + enTitle);
        }
    }
}
