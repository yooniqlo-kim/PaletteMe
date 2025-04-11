package com.ssafy.paletteme.common.redis;

import com.ssafy.paletteme.domain.users.dto.ArtworkRecommendationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RedisService {

    private final StringRedisTemplate redisTemplate;

    public void set(String key, String value, Duration timeout) {
        redisTemplate.opsForValue().set(key, value, timeout);
    }

    public String get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public List<ArtworkRecommendationResponse> getAllArtworkRecommendations() {
        Set<String> keys = redisTemplate.keys("recommend:artwork:*");
        if (keys == null || keys.isEmpty()) return Collections.emptyList();

        return keys.stream()
                .map(key -> {
                    String value = redisTemplate.opsForValue().get(key);
                    String artworkId = key.replace("recommend:artwork:", "");
                    return new ArtworkRecommendationResponse(artworkId, value);
                })
                .collect(Collectors.toList());
    }

    public void delete(String key) {
        redisTemplate.delete(key);
    }

    public boolean hasKey(String key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }
}
