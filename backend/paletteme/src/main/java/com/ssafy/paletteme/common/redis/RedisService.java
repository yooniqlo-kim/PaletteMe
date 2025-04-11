package com.ssafy.paletteme.common.redis;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.paletteme.domain.users.dto.ArtworkRecommendationResponse;
import com.ssafy.paletteme.domain.users.dto.UserStats;
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
    private final ObjectMapper objectMapper = new ObjectMapper();

    public boolean hasKey(String key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    public void set(String key, String value, Duration timeout) {
        redisTemplate.opsForValue().set(key, value, timeout);
    }

    public String get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void delete(String key) {
        redisTemplate.delete(key);
    }

    public <T> void setObject(String key, T object, Duration timeout) {
        try {
            String json = objectMapper.writeValueAsString(object);
            set(key, json, timeout);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Object serialization failed", e);
        }
    }

    public <T> T getObject(String key, Class<T> clazz) {
        String json = get(key);
        if (json == null) return null;
        try {
            return objectMapper.readValue(json, clazz);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Object deserialization failed", e);
        }
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

    public void saveUserStats(UserStats userStats) {
        String key = "user:stats:" + userStats.getUserId();
        try {
            String value = objectMapper.writeValueAsString(userStats);
            redisTemplate.opsForValue().set(key, value, Duration.ofDays(1));
        } catch (JsonProcessingException e) {
            throw new RuntimeException("UserStats 직렬화 실패", e);
        }
    }


    public UserStats getUserStats(int userId) {
        String key = "user:stats:" + userId;
        String json = redisTemplate.opsForValue().get(key);

        if (json == null) return null;

        try {
            return objectMapper.readValue(json, UserStats.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("UserStats 역직렬화 실패", e);
        }
    }

}
