import { useState, useEffect } from 'react';
import WrappedStep from '@features/wrapped/WrappedStep';
import WrappedEnd from '@features/wrapped/WrappedEnd';

export default function WrappedPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  // 스크롤 제거
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden z-50 flex justify-center items-start">
      <div className="w-full max-w-[412px]">
        {currentStep < 5 ? (
          <WrappedStep currentStep={currentStep} onNext={handleNext} />
        ) : (
          <WrappedEnd />
        )}
      </div>
    </div>
  );
  
}

