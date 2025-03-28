import { useState, useEffect } from 'react';
import WrappedStep from '@/features/wrapped/WrappedStep';
import WrappedEnd from '@/features/wrapped/WrappedEnd';
import { wrappedDummy } from '@/shared/dummy/wrappedDummy';

export default function WrappedPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

// WrappedPage.tsx
return (
  <div className="fixed inset-0 h-screen w-screen overflow-hidden z-50 flex justify-center items-center">
    <div className="w-full max-w-[412px] h-full">
      {currentStep < 5 ? (
        <WrappedStep
          currentStep={currentStep}
          onNext={handleNext}
          {...wrappedDummy}
        />
      ) : (
        <WrappedEnd
          reviewPercentage={wrappedDummy.reviewPercentage}
          artistName={wrappedDummy.artistName}
          favoriteImg={wrappedDummy.favoriteImg}
          recommendedArtwork={wrappedDummy.recommendedArtwork}
          recommendedArtist={wrappedDummy.recommendedArtist}
          recommendedImg={wrappedDummy.recommendedImg}
        />
      )}
    </div>
  </div>
);

}
