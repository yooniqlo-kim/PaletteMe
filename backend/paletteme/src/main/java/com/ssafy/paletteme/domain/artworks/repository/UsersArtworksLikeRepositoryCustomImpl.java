package com.ssafy.paletteme.domain.artworks.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.paletteme.domain.artworks.entity.QUsersArtworksLike;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class UsersArtworksLikeRepositoryCustomImpl implements UsersArtworksLikeRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    QUsersArtworksLike usersArtworksLike = QUsersArtworksLike.usersArtworksLike;

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
}
