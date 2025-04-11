package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.myMuseum.dto.BookmarkedCollectionResponse;
import com.ssafy.paletteme.domain.myMuseum.exception.BookmarkedCollectionError;
import com.ssafy.paletteme.domain.myMuseum.exception.BookmarkedCollectionException;
import com.ssafy.paletteme.domain.myMuseum.repository.BookmarkedCollectionRepository;
import com.ssafy.paletteme.domain.myMuseum.repository.LikedCollectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookmarkedCollectionServiceImpl implements BookmarkedCollectionService{

    private final LikedCollectionRepository likedCollectionRepository;
    private final BookmarkedCollectionRepository bookmarkedCollectionRepository;

    @Override
    public List<BookmarkedCollectionResponse> getBookmarkedCollection(int userId, Integer cursor, int size) {
        List<BookmarkedCollectionResponse> responses = bookmarkedCollectionRepository.getBookmarkedCollection(userId, cursor, size);

        if(responses.isEmpty()){
            throw new BookmarkedCollectionException(BookmarkedCollectionError.EMPTY_BOOKMARKED_COLLECTION);
        }

        return responses;
    }
}
