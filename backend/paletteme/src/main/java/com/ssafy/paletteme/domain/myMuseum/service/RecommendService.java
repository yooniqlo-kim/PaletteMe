package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.myMuseum.dto.RecommendResponse;

import java.util.List;

public interface RecommendService {

    /**
     * 추천 결과 생성 및 반환
     */
    List<RecommendResponse> recommend(int userId, int limit);

    /**
     * 사용자 추천 이력 조회 (최근 N일 내 추천된 작품 ID 목록)
     */
    List<String> getRecentRecommendedArtworkIds(int userId);
}