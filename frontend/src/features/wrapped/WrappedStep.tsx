import { useState, useMemo } from 'react';
import wrapped01 from '@/assets/images/wrapped01.jpg';
import wrapped02 from '@/assets/images/wrapped02.jpg';
import wrapped03 from '@/assets/images/wrapped03.jpg';
import wrapped04 from '@/assets/images/wrapped04.jpg';
import wrapped05 from '@/assets/images/wrapped05.jpg';
import WrappedProgressBar from '@/shared/components/progressbar/WrappedProgressBar';
import { ArtworkCard } from '@/shared/components/artworks/ArtworkCard';
import { getWrappedMonthString } from '@/shared/utils/date';
import html2canvas from 'html2canvas';
import DownloadButton from '@/shared/components/buttons/DownloadButton';
import { Recommendation } from '@/shared/types/api/wrapped';

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
    wrapped01, wrapped02, wrapped03, wrapped04, wrapped05,
  ];

  const handleClick = () => {
    if (isReady) {
      setIsReady(false);
      onNext();
    }
  };

  const nickname = useMemo(() => {
    const user = sessionStorage.getItem("user");
    if (!user) return "사용자";
  
    try {
      const parsed = JSON.parse(user);
      return parsed.nickname || "사용자";
    } catch {
      return "사용자";
    }
  }, []);
  

  const handleDownload = async () => {
    const target = document.getElementById("wrapped-capture");
    if (!target) return;

    const canvas = await html2canvas(target, {
      useCORS: true,
      scrollY: -window.scrollY,
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `palette-wrapped-step-${currentStep + 1}.png`;
    link.click();
  };

  return (
    <div className="w-full h-full mx-auto relative overflow-hidden">
      {/* 캡쳐 대상 전체 */}
      <div
        id="wrapped-capture"
        className="w-full h-full relative flex flex-col items-center justify-center px-4 text-center"
        style={{
          backgroundImage: `url(${wrappedImages[currentStep]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
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
            <p className="text-xl font-bold text-primary">{artistName}</p>
            <p className="p-4 text-mg">입니다</p>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-md font-bold mb-2">지난 한달 간</h2>
            <p className="font-bold text-lg">
              <span className="text-primary">{reviewCnt}개</span> 감상평을 남겨
            </p>
            <p className=" font-bold text-lg">
              상위 <span className="text-primary">{reviewPercentage}%</span> 가 되셨네요!
            </p>
            <div className="px-2 mt-12">
              <p className="p-4 mt-4 font-bold">
                전체 감상자 중 <span className="text-primary">{reviewRank}위</span>에 올라와 계세요
              </p>
              <p className="mt-2">
                당신의 시선과 마음이 담긴 감상 하나하나가 모여,<br />
                멋진 색으로 완성되었어요.
              </p>
            </div>
          </>
        )}

        {currentStep === 3 && favoriteArtwork?.imgUrl && (
          <>
            <h2 className="max-w-[300px] w-full mx-auto mb-2 font-semibold text-lg">가장 인상깊게 본 작품은</h2>
            <p className="mt-2 font-bold text-mg text-primary">{favoriteArtwork.title}</p>
            <p className="mt-1 mb-4 text-neutral-7">{favoriteArtwork.artist}</p>
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
                    <p className="mt-2 text-primary text-sm font-semibold break-words">{item.title}</p>
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

      {/* 진행바 (캡처 제외) */}
      <div className="absolute top-[1.5rem] w-full flex justify-center z-50" data-html2canvas-ignore="true">
        <WrappedProgressBar
          currentStep={currentStep}
          onComplete={() => setIsReady(true)}
        />
      </div>

      {/* 다운로드 버튼 (캡처 제외) */}
      {currentStep > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50" data-html2canvas-ignore="true">
          <DownloadButton onClick={handleDownload} />
        </div>
      )}

      {/* 다음 스텝 클릭 */}
      <div
        className={`absolute top-0 left-0 w-full h-full z-40 transition-all ${
          isReady ? 'cursor-pointer' : 'cursor-default'
        }`}
        onClick={handleClick}
      />
    </div>
  );
}
