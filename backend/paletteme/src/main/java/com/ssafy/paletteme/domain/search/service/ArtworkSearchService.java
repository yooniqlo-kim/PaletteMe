package com.ssafy.paletteme.domain.search.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import com.ssafy.paletteme.domain.search.document.ArtworkDocument;
import com.ssafy.paletteme.domain.search.dto.ArtworkSearchResponse;
import com.ssafy.paletteme.domain.search.exception.SearchError;
import com.ssafy.paletteme.domain.search.exception.SearchException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface ArtworkSearchService {

    public List<ArtworkSearchResponse> searchByKeyword(String keyword, Double lastScore, String lastArtworkId, int size);

    public Map<String, String> splitByLanguage(String input);
}
