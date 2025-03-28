package com.ssafy.paletteme.domain.search.dto;

import co.elastic.clients.elasticsearch.core.search.Hit;
import com.ssafy.paletteme.domain.search.document.ArtworkDocument;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArtworkSearchResponse {

    private String artworkId;
    private String korTitle;
    private String enTitle;
    private String korArtist;
    private String enArtist;
    private String imageUrl;
    private Double score;

    @Builder
    public ArtworkSearchResponse(String artworkId, String korTitle, String enTitle,
                                 String korArtist, String enArtist, String imageUrl, Double score) {
        this.artworkId = artworkId;
        this.korTitle = korTitle;
        this.enTitle = enTitle;
        this.korArtist = korArtist;
        this.enArtist = enArtist;
        this.imageUrl = imageUrl;
        this.score = score;
    }

    public static ArtworkSearchResponse fromHit(Hit<ArtworkDocument> hit) {
        ArtworkDocument doc = hit.source();
        return ArtworkSearchResponse.builder()
                .artworkId(doc.getArtwork_id())
                .korTitle(doc.getKor_title())
                .enTitle(doc.getEn_title())
                .korArtist(doc.getKor_artist())
                .enArtist(doc.getEn_artist())
                .imageUrl(doc.getImage_url())
                .score(hit.score())
                .build();
    }
}
