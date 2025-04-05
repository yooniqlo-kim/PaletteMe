import { useState, useMemo } from 'react';
import wrapped01 from '@/assets/images/wrapped01.jpg';
import wrapped02 from '@/assets/images/wrapped02.jpg';
import wrapped03 from '@/assets/images/wrapped03.jpg';
import wrapped04 from '@/assets/images/wrapped04.jpg';
import wrapped05 from '@/assets/images/wrapped05.jpg';
import WrappedProgressBar from '@/shared/components/progressbar/WrappedProgressBar';
import { ArtworkCard } from '@/shared/components/artworks/ArtworkCard';
import { getWrappedMonthString } from '@/shared/utils/date';

import { Recommendation } from '@/shared/api/wrapped';

interface Props {
  currentStep: number;
  onNext: () => void;
  artistName: string;
  reviewCnt: number;
  reviewPercentage: number;
  reviewRank: number;
  favoriteArtwork: {
    title: string;
    artist: string;
    imgUrl: string;
  };
  recommendations: Recommendation[];
}

export default function WrappedStep({
  currentStep,
  onNext,
  artistName,
  reviewCnt,
  reviewPercentage,
  reviewRank,
  favoriteArtwork,
  recommendations,
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
            <img
              src="/src/assets/logos/MainLogo_142x24.svg"
              alt="PaletteMe 로고"
              className="mb-4 h-[32px] mx-auto"
            />
            <h2 className="text-lg font-semibold">{getWrappedMonthString()}</h2>
            <p className="text-2xl font-semibold">Wrapped 결산</p>
            <p className="mt-4">
              지난 한 달간 <span className="font-semibold">{nickname}</span> 님의 활동 기록입니다.
            </p>
            <p className="mt-2">시작해볼까요?</p>
          </>
        )}

        {currentStep === 1 && (
          <>
            <h2 className="text-lg font-semibold mb-2">당신의 최애 화가는</h2>
            <p className="text-xl font-bold text-primary">
              {artistName}
            </p>
            <p className="text-mg">입니다</p>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-lg font-bold mb-2">지난 한달 간</h2>
            <p className="text-md">
              <span className="font-bold text-primary">{reviewCnt}개</span> 감상평을 남겨
            </p>
            <p className="text-md">
              상위 <span className="font-bold text-primary">{reviewPercentage}%</span> 가 되셨네요!
            </p>
            <br/>
            <br/>
            <p>
              전체 감상자 중 <span className="font-bold text-primary">{reviewRank}위</span>에 올라와 계세요
            </p>
            <p className="mt-2">
              당신의 시선과 마음이 담긴 감상 하나하나가 모여,<br />
              멋진 색으로 완성되었어요.
            </p>
          </>
        )}
        {currentStep === 3 && favoriteArtwork?.imgUrl && (
          <>
            <h2 className="max-w-[300px] w-full mx-auto font-semibold text-lg">가장 인상깊게 본 작품은</h2>
            <p className="mt-2 font-bold text-mg text-primary">{favoriteArtwork.title}</p>
            <p className="mt-2">{favoriteArtwork.artist}</p>
            <ArtworkCard
              artwork={{
                artworkId: 'wrapped-favorite',
                artworkImageUrl: favoriteArtwork.imgUrl,
                title: favoriteArtwork.title,
                isLiked: false,
                artist: favoriteArtwork.artist,
              }}
              size="large"
              theme="light"
              hasBorder
            />
          </>
        )}
        {currentStep === 4 && recommendations.length >= 1 && (
          <>
            <h2 className="text-lg font-semibold mb-4">당신에게 추천하는 작품이에요</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {recommendations.slice(0, 2).map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="max-w-[300px] text-center">
                    <p className="mt-2 text-primary text-sm font-semibold break-words">
                      {item.title}
                    </p>
                    <p className="text-sm text-neutral-7 break-words">{item.artist}</p>
                  </div>
                  <div className="mt-2 max-w-[180px] w-full">
                    <ArtworkCard
                      artwork={{
                        artworkId: `wrapped-reco-${i}`,
                        artworkImageUrl: item.imgUrl,
                        title: item.title,
                        isLiked: false,
                        artist: item.artist,
                      }}
                      size="small"
                      theme="light"
                      hasBorder
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
