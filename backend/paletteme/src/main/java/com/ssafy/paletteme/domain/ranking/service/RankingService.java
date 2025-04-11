package com.ssafy.paletteme.domain.ranking.service;

import com.ssafy.paletteme.common.redis.RedisService;
import com.ssafy.paletteme.domain.ranking.repository.RankingRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final RankingRepository rankingRepository;
    private final RedisService redisService;

    private static final String RANKING_CACHE_KEY = "ranking";

    // 1시간마다 갱신
    @Scheduled(cron = "0 0 * * * *")
    public void updateRankingCache() {
        List<String> topRanking = rankingRepository.findTop10Ranking();
        redisService.setObject(RANKING_CACHE_KEY, topRanking, Duration.ofHours(2));
    }

    // ✅ 서버 실행 시 1회 자동 실행
    @PostConstruct
    public void initRanking() {
        updateRankingCache();
//        System.out.println("🔥 랭킹 캐시 초기화 완료!");
    }

    public List<String> ranking() {
        List<String> ranking = redisService.getObject(RANKING_CACHE_KEY, List.class);
        return ranking != null ? ranking : List.of();
    }

}
