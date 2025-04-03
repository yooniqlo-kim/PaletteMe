package com.ssafy.paletteme.domain.search.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.ssafy.paletteme.domain.artworks.repository.UsersArtworksLikeRepository;
import com.ssafy.paletteme.domain.search.document.ArtworkDocument;
import com.ssafy.paletteme.domain.search.dto.ArtworkSearchResponse;
import com.ssafy.paletteme.domain.search.exception.SearchError;
import com.ssafy.paletteme.domain.search.exception.SearchException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArtworkSearchServiceImpl implements ArtworkSearchService {

    private final ElasticsearchClient elasticsearchClient;
    private final UsersArtworksLikeRepository usersArtworksLikeRepository;

    public List<ArtworkSearchResponse> searchByKeyword(int userId, String keyword, Double lastScore, String lastArtworkId, int size) {

        if (keyword == null || keyword.trim().isEmpty()) {
            throw new SearchException(SearchError.EMPTY_KEYWORD);
        }

        Map<String, String> langSplit = splitByLanguage(keyword);
        String ko = langSplit.get("ko");
        String en = langSplit.get("en");

        List<Query> shouldQueries = new ArrayList<>();

        if (!ko.isEmpty()) {
            shouldQueries.add(Query.of(q -> q.match(m -> m.field("kor_title").query(ko))));
            shouldQueries.add(Query.of(q -> q.match(m -> m.field("kor_artist").query(ko))));
            shouldQueries.add(Query.of(q -> q.match(m -> m.field("description.ko").query(ko))));
        }

        if (!en.isEmpty()) {
            shouldQueries.add(Query.of(q -> q.match(m -> m.field("en_title").query(en))));
            shouldQueries.add(Query.of(q -> q.match(m -> m.field("en_artist").query(en))));
            shouldQueries.add(Query.of(q -> q.match(m -> m.field("description.en").query(en))));
        }

        // 언어 상관 없이 original에서 검색
        shouldQueries.add(Query.of(q -> q.match(m -> m.field("original_title").query(keyword))));
        shouldQueries.add(Query.of(q -> q.match(m -> m.field("original_artist").query(keyword))));
        
        try {
            SearchResponse<ArtworkDocument> response = elasticsearchClient.search(builder -> {
                builder.index("artworks_index")
                        .size(size)
                        .query(q -> q.bool(b -> b.should(shouldQueries).minimumShouldMatch("1")))
                        .sort(s -> s.score(score -> score.order(SortOrder.Desc))) // 1차: score 정렬
                        .sort(s -> s.field(f -> f.field("artwork_id").order(SortOrder.Desc))) // 2차: ID 안정 정렬
                        .source(src -> src.filter(f -> f.includes(
                                "artwork_id", "original_title", "kor_title", "en_title",
                                "original_artist", "kor_artist", "en_artist",
                                "description", "image_url", "created_year"
                        )));

                if (lastScore != null && lastArtworkId != null) {
                    builder.searchAfter(List.of(
                            FieldValue.of(lastScore),
                            FieldValue.of(lastArtworkId)
                    ));
                }

                return builder;
            }, ArtworkDocument.class);

            // 1. artworkId 수집
            List<Hit<ArtworkDocument>> hits = response.hits().hits();
            List<String> artworkIds = hits.stream()
                    .map(hit -> hit.source().getArtwork_id())
                    .collect(Collectors.toList());

            // 2. QueryDSL로 좋아요한 artworkId만 조회
            Set<String> likedArtworkIds = new HashSet<>(usersArtworksLikeRepository
                    .findLikedArtworkIdsByUserIdAndArtworkIds(userId, artworkIds));

            if (artworkIds.isEmpty()) {
                throw new SearchException(SearchError.NO_RESULT_FOUND);
            }

            return hits.stream()
                    .map(hit -> {
                        ArtworkDocument doc = hit.source();
                        boolean liked = likedArtworkIds.contains(doc.getArtwork_id());
                        return ArtworkSearchResponse.fromHit(hit, liked);
                    })
                    .toList();

        } catch (IOException e) {
            System.out.println(e.getMessage());
            throw new SearchException(SearchError.ELASTICSEARCH_ERROR);
        }
    }

    public Map<String, String> splitByLanguage(String input) {
        //검색어를 한국어와 영어로 분리

        String[] words = input.split("\\s+");

        StringBuilder korean = new StringBuilder();
        StringBuilder english = new StringBuilder();

        for (String word : words) {
            if (word.matches(".*[가-힣]+.*")) {
                korean.append(word).append(" ");
            } else if (word.matches(".*[a-zA-Z]+.*")) {
                english.append(word.toLowerCase()).append(" ");
            }
        }

        Map<String, String> result = new HashMap<>();
        result.put("ko", korean.toString().trim());
        result.put("en", english.toString().trim());
        return result;
    }
}
