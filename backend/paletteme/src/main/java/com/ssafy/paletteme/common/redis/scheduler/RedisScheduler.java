package com.ssafy.paletteme.common.redis.scheduler;

import com.ssafy.paletteme.domain.users.entity.UserArtworkRecommend;
import com.ssafy.paletteme.domain.users.repository.UserArtworkRecommendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class RedisScheduler {
    private final StringRedisTemplate redisTemplate;
    private final UserArtworkRecommendRepository userArtworkRecommendRepository;

    // 2시간마다 실행 (매 2시간 정각: 0시, 2시, 4시, ...)
    @Scheduled(cron = "0 0 */2 * * *")
    public void updateArtworkRecommendationsInRedis() {
        List<UserArtworkRecommend> recommends = userArtworkRecommendRepository.findAll();

        for (UserArtworkRecommend recommend : recommends) {
            String artworkId = recommend.getArtwork().getArtworkId();
            String imageUrl = recommend.getArtwork().getImageUrl();

            String redisKey = "recommend:artwork:" + artworkId;
            redisTemplate.opsForValue().set(redisKey, imageUrl);
        }
    }
}
