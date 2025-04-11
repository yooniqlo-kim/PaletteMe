package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.myMuseum.dto.BookmarkedCollectionResponse;

import java.util.List;

public interface BookmarkedCollectionService {

    List<BookmarkedCollectionResponse> getBookmarkedCollection(int userId, Integer cursor, int size);
}
