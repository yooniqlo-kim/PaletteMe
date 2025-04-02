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
    private String originalTitle;
    private String korTitle;
    private String enTitle;
    private String originalArtist;
    private String korArtist;
    private String enArtist;
    private String imageUrl;
    private Double score;

    @Builder
    private ArtworkSearchResponse(String artworkId, String originalTitle, String korTitle, String enTitle,
                                 String originalArtist, String korArtist, String enArtist, String imageUrl, Double score) {
        this.artworkId = artworkId;
        this.originalTitle = originalTitle;
        this.korTitle = korTitle;
        this.enTitle = enTitle;
        this.originalArtist = originalArtist;
        this.korArtist = korArtist;
        this.enArtist = enArtist;
        this.imageUrl = imageUrl;
        this.score = score;
    }

    public static ArtworkSearchResponse fromHit(Hit<ArtworkDocument> hit) {
        ArtworkDocument doc = hit.source();
        return ArtworkSearchResponse.builder()
                .artworkId(doc.getArtwork_id())
                .originalTitle(doc.getOriginal_title())
                .korTitle(doc.getKor_title())
                .enTitle(doc.getEn_title())
                .originalArtist(doc.getOriginal_artist())
                .korArtist(doc.getKor_artist())
                .enArtist(doc.getEn_artist())
                .imageUrl(doc.getImage_url())
                .score(hit.score())
                .build();
    }
}
