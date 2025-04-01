package com.ssafy.paletteme.domain.myMuseum.repository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.paletteme.domain.artworks.entity.QArtworks;
import com.ssafy.paletteme.domain.artworks.entity.QUsersArtworksLike;
import com.ssafy.paletteme.domain.myMuseum.dto.LikedCollectionResponse;
import com.ssafy.paletteme.domain.myMuseum.dto.QLikedCollectionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class LikedCollectionRepositoryCustomImpl implements LikedCollectionRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    QUsersArtworksLike usersArtworksLike = QUsersArtworksLike.usersArtworksLike;
    QArtworks artworks = QArtworks.artworks;
    @Override
    public List<LikedCollectionResponse> findLikedArtworksByUserId(int userId, int cursor, int size) {
        return queryFactory
                .select(new QLikedCollectionResponse(
                        usersArtworksLike.userArtworkLikeId,
                        usersArtworksLike.artwork.artworkId,
                        usersArtworksLike.artwork.imageUrl
                ))
                .from(usersArtworksLike)
                .join(usersArtworksLike.artwork, artworks)
                .where(usersArtworksLike.user.userId.eq((userId))
                        .and(cursor != 0
                                ? usersArtworksLike.userArtworkLikeId.gt(cursor)
                                : null))
                .fetch();
    }
}
