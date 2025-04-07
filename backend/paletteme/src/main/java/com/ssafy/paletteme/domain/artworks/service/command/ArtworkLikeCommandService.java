package com.ssafy.paletteme.domain.artworks.service.command;

import com.ssafy.paletteme.common.redis.RedisService;
import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import com.ssafy.paletteme.domain.artworks.entity.UsersArtworksLike;
import com.ssafy.paletteme.domain.artworks.entity.UsersArtworksLikeCnt;
import com.ssafy.paletteme.domain.artworks.exception.ArtworksError;
import com.ssafy.paletteme.domain.artworks.exception.ArtworksException;
import com.ssafy.paletteme.domain.artworks.repository.ArtworksRepository;
import com.ssafy.paletteme.domain.artworks.repository.UsersArtworksLikeCntRepository;
import com.ssafy.paletteme.domain.artworks.repository.UsersArtworksLikeRepository;
import com.ssafy.paletteme.domain.users.dto.UserStats;
import com.ssafy.paletteme.domain.users.entity.Users;
import com.ssafy.paletteme.domain.users.repository.UsersGradeRepository;
import com.ssafy.paletteme.domain.users.repository.UsersRepository;
import com.ssafy.paletteme.domain.users.utils.UsersGradeUpdater;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// 회원 가입 시에도 쓰이기 때문에 따로 분리
@Service
@RequiredArgsConstructor
public class ArtworkLikeCommandService {
    private final ArtworksRepository artworksRepository;
    private final UsersArtworksLikeRepository usersArtworksLikeRepository;
    private final UsersArtworksLikeCntRepository usersArtworksLikeCntRepository;
    private final RedisService redisService;
    private final UsersGradeRepository usersGradeRepository;
    private final UsersRepository usersRepository;
    private final UsersGradeUpdater usersGradeUpdater;


    @Transactional
    public void likeArtwork(Users user, String artworkId) {
        Artworks artwork = artworksRepository.findById(artworkId)
                .orElseThrow(() -> new ArtworksException(ArtworksError.ARTWORK_NOT_FOUND));

        boolean alreadyLiked = usersArtworksLikeRepository.existsByUserAndArtwork(user, artwork);
        if (alreadyLiked) {
            throw new ArtworksException(ArtworksError.ARTWORK_ALREADY_LIKED);
        }

        UsersArtworksLike like = UsersArtworksLike.of(user, artwork);
        usersArtworksLikeRepository.save(like);

        UsersArtworksLikeCnt likeCnt = usersArtworksLikeCntRepository.findByArtworkId(artworkId)
                .orElseGet(() -> usersArtworksLikeCntRepository.save(UsersArtworksLikeCnt.of(artworkId)));

        likeCnt.increaseLikeCnt(); // +1
        usersArtworksLikeCntRepository.save(likeCnt);


        UserStats userStats = redisService.getUserStats(user.getUserId());
        userStats.incrementLikeCount();

        // 유저 등급 변경 했는지 확인하기.
        usersGradeUpdater.updateUserGradeIfNeeded(userStats);

        redisService.saveUserStats(userStats);

    }
}
