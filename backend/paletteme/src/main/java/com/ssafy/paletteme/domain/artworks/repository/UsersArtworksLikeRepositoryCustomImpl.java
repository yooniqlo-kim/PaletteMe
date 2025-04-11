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
    public List<Integer> findLikedArtistIdsByUserId(int userId) {
        return queryFactory
                .select(qArtwork.artist.artistId)
                .from(usersArtworksLike)
                .join(usersArtworksLike.artwork, qArtwork)
                .join(qArtwork.artist, qArtist)
                .where(usersArtworksLike.user.userId.eq(userId))
                .distinct()
                .fetch();
    }

    @Override
    public List<String> findLikedArtworkIdsByUserId(int userId) {
        return queryFactory
                .select(usersArtworksLike.artwork.artworkId)
                .from(usersArtworksLike)
                .where(usersArtworksLike.user.userId.eq(userId))
                .fetch();
    }

    @Override
    public List<String> findArtworksLikedByUsersWhoLiked(List<String> likedArtworkIds, int userId, List<String> excludedArtworkIds) {
        // 유사 사용자의 ID를 조회 (내가 좋아한 작품을 좋아한 사용자, 현재 사용자 제외)
        List<Integer> similarUserIds = queryFactory
                .select(usersArtworksLike.user.userId)
                .from(usersArtworksLike)
                .where(
                        usersArtworksLike.artwork.artworkId.in(likedArtworkIds)
                                .and(usersArtworksLike.user.userId.ne(userId))
                )
                .distinct()
                .fetch();

        // 유사 사용자가 좋아한 작품 중, 내가 좋아한 작품을 제외한 목록을 조회
        return queryFactory
                .select(usersArtworksLike.artwork.artworkId)
                .from(usersArtworksLike)
                .where(
                        usersArtworksLike.user.userId.in(similarUserIds),
                        usersArtworksLike.artwork.artworkId.notIn(likedArtworkIds)
                )
                .distinct()
                .fetch();
    }

}
