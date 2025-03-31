package com.ssafy.paletteme.domain.artworks.service;

import com.ssafy.paletteme.domain.artworks.dto.ArtworkDescriptionResponse;
import com.ssafy.paletteme.domain.artworks.dto.ArtworkDetailResponse;
import com.ssafy.paletteme.domain.artworks.entity.UsersArtworksLikeCnt;
import com.ssafy.paletteme.domain.artworks.exception.ArtworksError;
import com.ssafy.paletteme.domain.artworks.exception.ArtworksException;
import com.ssafy.paletteme.domain.artworks.provider.GptPromptProvider;
import com.ssafy.paletteme.domain.artworks.repository.ArtworksRepository;
import com.ssafy.paletteme.domain.artworks.repository.UsersArtworksLikeCntRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArtworksService {
    private final ArtworksRepository artworksRepository;
    private final UsersArtworksLikeCntRepository usersArtworksLikeCntRepository;
    private final GptPromptProvider gptPromptProvider;
    private final ChatClient chatClient;

    // TODO: BOOKMARK, REVIEW 엔티티가 추가되면 2개의 값도 추가하여 던져주기
    public ArtworkDetailResponse getArtworkDetail(String artworkId) {
        // 작품 정보 불러오기
        ArtworkDetailResponse artworkDetailResponse = artworksRepository.findArtworkDetail(artworkId);

        // 작품 좋아요 수 불러오기
        UsersArtworksLikeCnt usersArtworksLikeCnt = usersArtworksLikeCntRepository.findByArtworkId(artworkId)
                .orElse(new UsersArtworksLikeCnt());
        artworkDetailResponse.updateLike(usersArtworksLikeCnt.getLikeCnt());

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

}
