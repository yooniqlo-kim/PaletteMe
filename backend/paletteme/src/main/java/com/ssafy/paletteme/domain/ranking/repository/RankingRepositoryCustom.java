package com.ssafy.paletteme.domain.ranking.repository;

import java.util.List;

public interface RankingRepositoryCustom {
    List<String> findTop10Ranking();
}
