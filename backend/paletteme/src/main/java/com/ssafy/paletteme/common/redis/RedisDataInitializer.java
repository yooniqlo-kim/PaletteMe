package com.ssafy.paletteme.common.redis;

import com.ssafy.paletteme.domain.users.entity.UserArtworkRecommend;
import com.ssafy.paletteme.domain.users.repository.UserArtworkRecommendRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class RedisDataInitializer {
    private final StringRedisTemplate redisTemplate;
    private final UserArtworkRecommendRepository userArtworkRecommendRepository;

    @PostConstruct
    public void init() {
        List<UserArtworkRecommend> recommends = userArtworkRecommendRepository.findAll();

        for (UserArtworkRecommend recommend : recommends) {
            String artworkId = recommend.getArtwork().getArtworkId();
            String imageUrl = recommend.getArtwork().getImageUrl();

            String redisKey = "recommend:artwork:" + artworkId;
            redisTemplate.opsForValue().set(redisKey, imageUrl);
        }
    }
}

