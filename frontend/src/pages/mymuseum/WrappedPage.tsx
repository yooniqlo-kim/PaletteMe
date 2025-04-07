import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import WrappedStep from '@/features/wrapped/WrappedStep';
import WrappedEnd from '@/features/wrapped/WrappedEnd';
import { fetchWrapped } from '@features/wrapped/api/wrappedApi';
import type { WrappedData } from "@/shared/types/WrappedData";
import { mapWrappedData } from '@/shared/utils/mapWrappedData';

export default function WrappedPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [wrappedData, setWrappedData] = useState<WrappedData | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isSample = new URLSearchParams(location.search).get("sample") === "true";

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  useEffect(() => {
    if (currentStep === 5 && isSample) {
      sessionStorage.removeItem("wrapped-sample");
    }
  }, [currentStep, isSample]);
  

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const getWrapped = async () => {
      if (isSample) {
        const sample = sessionStorage.getItem("wrapped-sample");
        if (sample) {
          setWrappedData(JSON.parse(sample));
          setLoading(false);
          return;
        }
      }

      try {
        const rawData = await fetchWrapped(); 
        const mapped = mapWrappedData(rawData);
        setWrappedData(mapped);                   
      } catch (e) {
        console.error("랩트 API 호출 실패:", e);
      } finally {
        setLoading(false);
      }
    };

    getWrapped();

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  },[isSample]);

  if (loading || !wrappedData) return <div>로딩 중...</div>;

  

  const {
    favoriteArtwork,
    reviewRank,
    mostMemorableArtwork,
    review_based_recommendations = [],
  } = wrappedData;

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden z-50 flex justify-center items-center">
      <div className="w-full max-w-[412px] h-full">
        {currentStep < 5 ? (
          <WrappedStep
            currentStep={currentStep}
            onNext={handleNext}
            artistName={favoriteArtwork.artist}
            reviewCnt={reviewRank.reviewCount}
            reviewPercentage={reviewRank.topPercentage}
            reviewRank={reviewRank.myRank}
            favoriteArtwork={mostMemorableArtwork}
            recommendations={review_based_recommendations}
          />
        ) : (
          <WrappedEnd
            reviewCount={reviewRank.reviewCount}
            reviewPercentage={reviewRank.topPercentage}
            artistName={favoriteArtwork.artist}
            favoriteArtwork={mostMemorableArtwork}
            recommendations={review_based_recommendations}
          />
        )}
      </div>
    </div>
  );
}