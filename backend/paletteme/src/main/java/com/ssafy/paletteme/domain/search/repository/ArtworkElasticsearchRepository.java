package com.ssafy.paletteme.domain.search.repository;

import com.ssafy.paletteme.domain.search.document.ArtworkDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ArtworkElasticsearchRepository extends ElasticsearchRepository<ArtworkDocument, Long> {

}
