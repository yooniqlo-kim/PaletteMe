package com.ssafy.paletteme.domain.myMuseum.service;

import com.ssafy.paletteme.domain.myMuseum.dto.LikedCollectionResponse;
import com.ssafy.paletteme.domain.myMuseum.exception.LikedCollectionError;
import com.ssafy.paletteme.domain.myMuseum.exception.LikedCollectionException;
import com.ssafy.paletteme.domain.myMuseum.repository.LikedCollectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikedCollectionServiceImpl implements LikedCollectionService{

    private final LikedCollectionRepository likedCollectionRepository;

    @Override
    public List<LikedCollectionResponse> getLikedCollection(int userId, Integer cursor, int size) {
        List<LikedCollectionResponse> responses = likedCollectionRepository.findLikedArtworksByUserId(userId, cursor, size);

        if(responses.isEmpty()){
            throw new LikedCollectionException(LikedCollectionError.EMPTY_LIKED_COLLECTION);
        }

        return responses;
    }
}
