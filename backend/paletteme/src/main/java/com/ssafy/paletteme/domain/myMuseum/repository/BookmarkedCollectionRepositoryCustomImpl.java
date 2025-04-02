package com.ssafy.paletteme.domain.myMuseum.repository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.paletteme.domain.artworks.entity.QArtworks;
import com.ssafy.paletteme.domain.artworks.entity.QUsersArtworksBookmark;
import com.ssafy.paletteme.domain.myMuseum.dto.BookmarkedCollectionResponse;
import com.ssafy.paletteme.domain.myMuseum.dto.QBookmarkedCollectionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BookmarkedCollectionRepositoryCustomImpl implements BookmarkedCollectionRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    QUsersArtworksBookmark usersArtworksBookmark = QUsersArtworksBookmark.usersArtworksBookmark;
    QArtworks artworks = QArtworks.artworks;
    @Override
    public List<BookmarkedCollectionResponse> getBookmarkedCollection(int userId, Integer cursor, int size) {
        return queryFactory
                .select(new QBookmarkedCollectionResponse(
                        usersArtworksBookmark.userArtworkBookmarkId,
                        usersArtworksBookmark.artwork.artworkId,
                        usersArtworksBookmark.artwork.imageUrl
                ))
                .from(usersArtworksBookmark)
                .join(usersArtworksBookmark.artwork, artworks)
                .where(usersArtworksBookmark.user.userId.eq((userId))
                        .and(cursor != null ? usersArtworksBookmark.userArtworkBookmarkId.lt(cursor) : null))
                .orderBy(usersArtworksBookmark.userArtworkBookmarkId.desc())
                .limit(size)
                .fetch();
    }
}
