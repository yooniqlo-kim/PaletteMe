package com.ssafy.paletteme.domain.artworks.service;

import com.ssafy.paletteme.domain.artworks.dto.ArtworkDescriptionResponse;
import com.ssafy.paletteme.domain.artworks.dto.ArtworkDetailResponse;
import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import com.ssafy.paletteme.domain.artworks.entity.UsersArtworksLike;
import com.ssafy.paletteme.domain.artworks.entity.UsersArtworksLikeCnt;
import com.ssafy.paletteme.domain.artworks.exception.ArtworksError;
import com.ssafy.paletteme.domain.artworks.exception.ArtworksException;
import com.ssafy.paletteme.domain.artworks.provider.GptPromptProvider;
import com.ssafy.paletteme.domain.artworks.repository.ArtworksRepository;
import com.ssafy.paletteme.domain.artworks.repository.UsersArtworksLikeCntRepository;
import com.ssafy.paletteme.domain.artworks.repository.UsersArtworksLikeRepository;
import com.ssafy.paletteme.domain.users.entity.Users;
import com.ssafy.paletteme.domain.users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArtworksService {
    private final ArtworksRepository artworksRepository;
    private final UsersArtworksLikeCntRepository usersArtworksLikeCntRepository;
    private final GptPromptProvider gptPromptProvider;
    private final ChatClient chatClient;
    private final UsersRepository usersRepository;
    private final UsersArtworksLikeRepository  usersArtworksLikeRepository;

    // TODO: BOOKMARK, REVIEW 엔티티가 추가되면 2개의 값도 추가하여 던져주기
    public ArtworkDetailResponse getArtworkDetail(String artworkId) {
        // 작품 정보 불러오기
        ArtworkDetailResponse artworkDetailResponse = artworksRepository.findArtworkDetail(artworkId);

        // 작품 좋아요 수 불러오기
        UsersArtworksLikeCnt usersArtworksLikeCnt = usersArtworksLikeCntRepository.findByArtworkId(artworkId)
                .orElseGet(() -> {
                    UsersArtworksLikeCnt newCnt = UsersArtworksLikeCnt.of(artworkId);
                    return usersArtworksLikeCntRepository.save(newCnt);
                });

        artworkDetailResponse.updateLike(usersArtworksLikeCnt.getLikeCnt()); // 좋아요 테이블에 값이 없을 경우 테이블 생성하기

        return artworkDetailResponse;
    }


    public ArtworkDescriptionResponse getArtworkDescription(String artworkId) {
        Prompt prompt = gptPromptProvider.buildPromptWithUserMessage(artworkId + "에 대해 설명해줘");

        // GPT 프롬프팅 통해서 정형화된 형태의 데이터 얻어오기
//        ChatResponse chatResponse = chatClient.call(prompt);
//        if (chatResponse == null || chatResponse.getResult() == null || chatResponse.getResult().getOutput() == null) {
//                throw new ArtworksException(ArtworksError.GPT_RESPONSE_FAILED);
//        }
//        String description = chatResponse.getResult().getOutput().getContent();
        String description = "MJ의 설명";
        return ArtworkDescriptionResponse.of(description);
    }

    @Transactional
    public void likeArtwork(int userId, String artworkId){
        Users user = usersRepository.findById((long)userId)
                .orElseThrow(() -> new ArtworksException(ArtworksError.USER_NOT_FOUND));

        Artworks artwork = artworksRepository.findById(artworkId)
                .orElseThrow(() -> new ArtworksException(ArtworksError.ARTWORK_NOT_FOUND));

        boolean alreadyLiked = usersArtworksLikeRepository.existsByUserAndArtwork(user, artwork);
        if (alreadyLiked) {
            throw new ArtworksException(ArtworksError.ARTWORK_ALREADY_LIKED);
        }

        UsersArtworksLike like = UsersArtworksLike.of(user, artwork);
        usersArtworksLikeRepository.save(like);

        UsersArtworksLikeCnt usersArtworksLikeCnt = usersArtworksLikeCntRepository.findByArtworkId(artworkId)
                .orElseThrow(() -> new ArtworksException(ArtworksError.ARTWORKLIKECNT_NOT_FOUND));
        usersArtworksLikeCnt.increaseLikeCnt();
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

}
