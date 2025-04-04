import { useState } from 'react';
import { useMemo } from 'react';
import wrapped01 from '@/assets/images/wrapped01.jpg';
import wrapped02 from '@/assets/images/wrapped02.jpg';
import wrapped03 from '@/assets/images/wrapped03.jpg';
import wrapped04 from '@/assets/images/wrapped04.jpg';
import wrapped05 from '@/assets/images/wrapped05.jpg';
import WrappedProgressBar from '@/shared/components/progressbar/WrappedProgressBar';
import { ArtworkCard } from '@/shared/components/artworks/ArtworkCard';
import { getWrappedMonthString } from '@/shared/utils/date';

interface Props {
  currentStep: number;
  onNext: () => void;
  artistName: string;
  reviewCnt: number;
  reviewPercentage: number;
  reviewRank: number;
  favoriteName: string;
  favoriteArtist: string;
  favoriteImg: string;
  recommendedArtwork: string[];
  recommendedArtist: string[];
  recommendedImg: string[];
}

export default function WrappedStep({
  currentStep,
  onNext,
  artistName,
  reviewCnt,
  reviewPercentage,
  reviewRank,
  favoriteName,
  favoriteArtist,
  favoriteImg,
  recommendedArtwork,
  recommendedArtist,
  recommendedImg,
}: Props) {
  const [isReady, setIsReady] = useState(false);

  const wrappedImages = [
    wrapped01,
    wrapped02,
    wrapped03,
    wrapped04,
    wrapped05,
  ];

  const handleClick = () => {
    if (isReady) {
      setIsReady(false);
      onNext();
    }
  };

  const nickname = useMemo(() => sessionStorage.getItem("nickname") || "사용자", []);

  return (
    <div className="w-full h-full mx-auto relative overflow-hidden">
      <img
        src={wrappedImages[currentStep]}
        alt={`Wrapped step ${currentStep + 1}`}
        className="w-full h-full object-cover absolute inset-0 z-0"
      />

      <div className="absolute top-[1.5rem] w-full flex justify-center z-10">
        <WrappedProgressBar
          currentStep={currentStep}
          onComplete={() => setIsReady(true)}
        />
      </div>

      <div
        className={`absolute top-0 left-0 w-full h-full z-20 flex flex-col items-center justify-center px-4 text-center transition-all ${
          isReady ? 'cursor-pointer' : 'cursor-default'
        }`}
        onClick={handleClick}
      >
        {currentStep === 0 && (
          <>
            <h2 className="text-xl mb-2">{getWrappedMonthString()}</h2>
            <p className="text-2xl font-bold">Wrapped 결산</p>
            <p className="mt-4">
              지난 한 달간 <span className="font-semibold">{nickname} 덕후</span> 님의 활동 기록입니다.
            </p>
            <p className="mt-2">시작해볼까요?</p>
          </>
        )}

        {currentStep === 1 && (
          <>
            <h2 className="text-xl mb-2">당신의 최애 화가는</h2>
            <p className="text-lg font-bold">{artistName}</p>
            <p>입니다</p>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-xl mb-2">지난 한달 간</h2>
            <p>{reviewCnt}개 감상평을 남겨</p>
            <p>상위 {reviewPercentage}% 가 되셨네요!</p>
            <p>전체 감상자 중 {reviewRank}위에 올라와 계세요</p>
            <p className="mt-2">당신의 시선과 마음이 담긴 감상 하나하나가 모여, 멋진 색으로 완성되었어요.</p>
          </>
        )}

        {currentStep === 3 && favoriteImg && (
          <>
            <h2 className="max-w-[300px] w-full mx-auto">가장 인상깊게 본 작품은</h2>
            <ArtworkCard
              artwork={{
                artworkId: 'wrapped-favorite',
                artworkImageUrl: favoriteImg,
                title: favoriteName || '',
                isLiked: false,
                artist: favoriteArtist || '',
              }}
              size="large"
              theme="light"
              hasBorder
            />
            <p className="mt-2">작가: {favoriteArtist}</p>
            <p className="mt-2">작품이름: {favoriteName}</p>
          </>
        )}

        {currentStep === 4 &&
          recommendedImg &&
          recommendedImg.length >= 2 &&
          recommendedArtwork &&
          recommendedArtist && (
            <>
              <h2 className="text-xl mb-4">당신에게 추천하는 작품이에요</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {[0, 1].map((i) => (
                  <div key={i} className="w-full max-w-[140px]">
                    <ArtworkCard
                      artwork={{
                        artworkId: `wrapped-reco-${i}`,
                        artworkImageUrl: recommendedImg[i],
                        title: recommendedArtwork[i] || '',
                        isLiked: false,
                        artist: recommendedArtist[i] || '',
                      }}
                      size="small"
                      theme="light"
                      hasBorder
                    />
                  </div>
                ))}
              </div>
              <p className="mt-2">
                작가: {recommendedArtist[0]}, {recommendedArtist[1]}
              </p>
              <p className="mt-2">
                작품이름: {recommendedArtwork[0]}, {recommendedArtwork[1]}
              </p>
            </>
          )}
      </div>
    </div>
  );
}
