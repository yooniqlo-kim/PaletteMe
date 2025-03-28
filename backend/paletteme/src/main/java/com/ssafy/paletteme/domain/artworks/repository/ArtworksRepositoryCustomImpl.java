package com.ssafy.paletteme.domain.artworks.repository;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.paletteme.domain.artworks.dto.ArtworkDetailResponse;
import com.ssafy.paletteme.domain.artworks.dto.QArtworkDetailResponse;
import com.ssafy.paletteme.domain.artworks.entity.QArtists;
import com.ssafy.paletteme.domain.artworks.entity.QArtworks;
import com.ssafy.paletteme.domain.artworks.entity.QMuseums;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;


@Repository
@RequiredArgsConstructor
public class ArtworksRepositoryCustomImpl implements ArtworksRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    QArtworks artwork = QArtworks.artworks;
    QMuseums museum = QMuseums.museums;
    QArtists artist = QArtists.artists;
    public ArtworkDetailResponse findArtworkDetail(String artworkId) {
        return queryFactory
                .select(new QArtworkDetailResponse(
                        artwork.imageUrl,
                        museum.museumName,
                        artwork.enTitle,
                        artist.enArtist,
                        artwork.createdYear,
                        artwork.description
                ))
                .from(artwork)
                .leftJoin(artwork.museum, museum)
                .leftJoin(artwork.artist, artist)
                .where(artwork.artworkId.eq(artworkId))
                .fetchOne();
    }
}
