package com.ssafy.paletteme.domain.myMuseum.repository;

import com.ssafy.paletteme.domain.myMuseum.dto.BookmarkedCollectionResponse;

import java.util.List;

public interface BookmarkedCollectionRepositoryCustom {

    List<BookmarkedCollectionResponse> getBookmarkedCollection(int userId, Integer cursor, int size);
}
