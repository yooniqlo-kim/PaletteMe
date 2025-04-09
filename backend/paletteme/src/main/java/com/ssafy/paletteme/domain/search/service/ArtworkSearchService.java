package com.ssafy.paletteme.domain.search.service;

import com.ssafy.paletteme.domain.search.dto.ArtworkSearchResponse;
import java.util.List;
import java.util.Map;

public interface ArtworkSearchService {

    List<ArtworkSearchResponse> searchByKeyword(int userId, String keyword, Double lastScore, String lastArtworkId, int size);

    Map<String, String> splitByLanguage(String input);
}
