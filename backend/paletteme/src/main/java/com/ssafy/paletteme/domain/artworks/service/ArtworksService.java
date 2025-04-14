package com.ssafy.paletteme.domain.artworks.service;

import com.ssafy.paletteme.domain.artworks.dto.ArtworkDescriptionResponse;
import com.ssafy.paletteme.domain.artworks.dto.ArtworkDetailResponse;
import com.ssafy.paletteme.domain.artworks.entity.*;
import com.ssafy.paletteme.domain.artworks.exception.ArtworksError;
import com.ssafy.paletteme.domain.artworks.exception.ArtworksException;
import com.ssafy.paletteme.domain.artworks.provider.GptPromptProvider;
import com.ssafy.paletteme.domain.artworks.repository.*;
import com.ssafy.paletteme.domain.artworks.service.command.ArtworkLikeCommandService;
import com.ssafy.paletteme.domain.reviews.entity.Reviews;
import com.ssafy.paletteme.domain.reviews.repository.ReviewsRepository;
import com.ssafy.paletteme.domain.users.entity.Users;
import com.ssafy.paletteme.domain.users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ArtworksService {
    private static final Logger log = LoggerFactory.getLogger(ArtworksService.class);

    private final ArtworksRepository artworksRepository;
    private final UsersArtworksLikeCntRepository usersArtworksLikeCntRepository;
    private final GptPromptProvider gptPromptProvider;
    private final ChatClient chatClient;
    private final UsersRepository usersRepository;
    private final UsersArtworksLikeRepository  usersArtworksLikeRepository;
    private final UsersArtworksBookmarkRepository  usersArtworksBookmarkRepository;
    private final ReviewsRepository reviewsRepository;
    private final DailyArtRepository dailyArtRepository;

    private final ArtworkLikeCommandService artworkLikeCommandService;

    public ArtworkDetailResponse getArtworkDetail(Integer userId, String artworkId) {
        Artworks artwork = artworksRepository.findById(artworkId)
                .orElseThrow(() -> new ArtworksException(ArtworksError.ARTWORK_NOT_FOUND));

        ArtworkDetailResponse artworkDetailResponse = artworksRepository.findArtworkDetail(artworkId);

        // 작품 좋아요 수 불러오기
        UsersArtworksLikeCnt usersArtworksLikeCnt = usersArtworksLikeCntRepository.findByArtworkId(artworkId)
                .orElseGet(() -> {
                    UsersArtworksLikeCnt newCnt = UsersArtworksLikeCnt.of(artworkId);
                    return usersArtworksLikeCntRepository.save(newCnt);
                });
        artworkDetailResponse.updateLike(usersArtworksLikeCnt.getLikeCnt());

        if(userId != null) {
            Users user = usersRepository.findById((long) userId)
                    .orElseThrow(() -> new ArtworksException(ArtworksError.USER_NOT_FOUND));

            // 작품 좋아요 눌렀는지 확인하기
            Boolean isLiked = usersArtworksLikeRepository.existsByUserAndArtwork(user, artwork);
            artworkDetailResponse.isLiked(isLiked);

            // 작품 북마크 눌렀는지 확인하기
            Boolean isBookMarked = usersArtworksBookmarkRepository.existsByUserAndArtwork(user, artwork);
            artworkDetailResponse.isBookMarked(isBookMarked);

            // 내 리뷰 중 가장 최신 리뷰 한 건만 가져오기
            Reviews myReview = reviewsRepository.findTopByUserAndArtworkOrderByCreatedAtDesc(user, artwork).orElse(null);
            Integer myReviewId = (myReview == null) ? null : myReview.getReviewId();
            artworkDetailResponse.updateMyReviewId(myReviewId);
        }

        return artworkDetailResponse;
    }

    public ArtworkDescriptionResponse getArtworkDescription(String artworkId) {
        ArtworkDetailResponse artworkDetailResponse = artworksRepository.findArtworkDetail(artworkId);

        Prompt prompt = gptPromptProvider.buildPromptWithUserMessage(artworkDetailResponse);

        // GPT 프롬프팅 통해서 정형화된 형태의 데이터 얻어오기
        ChatResponse chatResponse = chatClient.call(prompt);
        if (chatResponse == null || chatResponse.getResult() == null || chatResponse.getResult().getOutput() == null) {
                throw new ArtworksException(ArtworksError.GPT_RESPONSE_FAILED);
        }

        String description = chatResponse.getResult().getOutput().getContent();

        return ArtworkDescriptionResponse.of(description);
    }

    @Transactional
    public void likeArtwork(int userId, String artworkId){
        Users user = usersRepository.findById((long)userId)
                .orElseThrow(() -> new ArtworksException(ArtworksError.USER_NOT_FOUND));
        Artworks artwork = artworksRepository.findById(artworkId)
                        .orElseThrow(() -> new ArtworksException(ArtworksError.ARTWORK_NOT_FOUND));

        usersArtworksLikeRepository.findByUserAndArtwork(user, artwork)
                .ifPresent(like -> {
                    throw new ArtworksException(ArtworksError.ARTWORK_ALREADY_LIKED);
                });

        artworkLikeCommandService.likeArtwork(user, artworkId);
    }

    @Transactional
    public void cancelArtworkLike(int userId, String artworkId){
        Users user = usersRepository.findById((long) userId)
                .orElseThrow(() -> new ArtworksException(ArtworksError.USER_NOT_FOUND));

        Artworks artwork = artworksRepository.findById(artworkId)
                .orElseThrow(() -> new ArtworksException(ArtworksError.ARTWORK_NOT_FOUND));

        // 좋아요한 기록이 있는지 찾기
        UsersArtworksLike like = usersArtworksLikeRepository.findByUserAndArtwork(user, artwork)
                .orElseThrow(() -> new ArtworksException(ArtworksError.ARTWORK_NOT_LIKED));

        usersArtworksLikeRepository.delete(like);

        UsersArtworksLikeCnt usersArtworksLikeCnt = usersArtworksLikeCntRepository.findByArtworkId(artworkId)
                .orElseThrow(() -> new ArtworksException(ArtworksError.ARTWORKLIKECNT_NOT_FOUND));
        usersArtworksLikeCnt.decreaseLikeCnt();
    }

    @Transactional
    public void bookmarkArtwork(int userId, String artworkId) {
        Users user = usersRepository.findById((long) userId)
                .orElseThrow(() -> new ArtworksException(ArtworksError.USER_NOT_FOUND));

        Artworks artwork = artworksRepository.findById(artworkId)
                .orElseThrow(() -> new ArtworksException(ArtworksError.ARTWORK_NOT_FOUND));

        boolean alreadyBookmarked = usersArtworksBookmarkRepository.existsByUserAndArtwork(user, artwork);
        if (alreadyBookmarked) {
            throw new ArtworksException(ArtworksError.ARTWORK_ALREADY_BOOKMARKED);
        }

        UsersArtworksBookmark bookmark = UsersArtworksBookmark.of(user, artwork);
        usersArtworksBookmarkRepository.save(bookmark);
    }


    @Transactional
    public void cancelBookmarkArtwork(int userId, String artworkId) {
        Users user = usersRepository.findById((long) userId)
                .orElseThrow(() -> new ArtworksException(ArtworksError.USER_NOT_FOUND));

        Artworks artwork = artworksRepository.findById(artworkId)
                .orElse(null);

        // 작품은 삭제됐는데, 북마크만 남아 있는 경우에 대한 처리
        if (artwork == null) {
            log.info("작품은 삭제되었지만 북마크 기록이 남아 있어 삭제 처리됨 - artworkId: {}", artworkId);
            UsersArtworksBookmark bookmark = usersArtworksBookmarkRepository
                    .findByUser_UserIdAndArtwork_ArtworkId(user.getUserId(), artworkId)
                    .orElseThrow(() -> new ArtworksException(ArtworksError.ARTWORK_NOT_BOOKMARKED));

            usersArtworksBookmarkRepository.delete(bookmark);
            return;
        }

        // 북마크 기록 확인
        UsersArtworksBookmark bookmark = usersArtworksBookmarkRepository
                .findByUserAndArtwork(user, artwork)
                .orElseThrow(() -> new ArtworksException(ArtworksError.ARTWORK_NOT_BOOKMARKED));

        usersArtworksBookmarkRepository.delete(bookmark);
    }


    public ArtworkDetailResponse getDailyArt(Integer userId) {

        LocalDate today = LocalDate.now();

        // 오늘의 추천 작품 조회
        String artworkId = dailyArtRepository.findByDate(today)
                .orElseThrow(() -> new ArtworksException(ArtworksError.DAILY_ART_NOT_FOUND))
                .getArtworkId();

        return getArtworkDetail(userId, artworkId);
    }

}
