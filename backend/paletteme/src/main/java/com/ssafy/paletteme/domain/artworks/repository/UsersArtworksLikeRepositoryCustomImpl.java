package com.ssafy.paletteme.domain.artworks.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.paletteme.domain.artworks.entity.QArtists;
import com.ssafy.paletteme.domain.artworks.entity.QArtworks;
import com.ssafy.paletteme.domain.artworks.entity.QUsersArtworksLike;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class UsersArtworksLikeRepositoryCustomImpl implements UsersArtworksLikeRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    QUsersArtworksLike usersArtworksLike = QUsersArtworksLike.usersArtworksLike;
    QArtworks qArtwork = QArtworks.artworks;
    QArtists qArtist = QArtists.artists;

    @Override
    public List<String> findLikedArtworkIdsByUserIdAndArtworkIds(int userId, List<String> artworkIds) {
        return queryFactory
                .select(usersArtworksLike.artwork.artworkId)
                .from(usersArtworksLike)
                .where(
                        usersArtworksLike.user.userId.eq(userId),
                        usersArtworksLike.artwork.artworkId.in(artworkIds)
                )
                .fetch();
    }

    @Override
    public List<Integer> findLikedArtworkIdsByUserId(int userId) {
        return queryFactory
                .select(qArtwork.artist.artistId)
                .from(usersArtworksLike)
                .join(usersArtworksLike.artwork, qArtwork)
                .join(qArtwork.artist, qArtist)
                .where(usersArtworksLike.user.userId.eq(userId))
                .distinct()
                .fetch();
    }
}
