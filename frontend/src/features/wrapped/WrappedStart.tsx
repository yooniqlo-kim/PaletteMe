import { useState } from 'react';
import wrapped01 from '@/assets/images/wrapped01.jpg';
import wrapped02 from '@/assets/images/wrapped02.jpg';
import wrapped03 from '@/assets/images/wrapped03.jpg';
import wrapped04 from '@/assets/images/wrapped04.jpg';
import wrapped05 from '@/assets/images/wrapped05.jpg';
import WrappedProgressBar from '@/shared/components/progressbar/WrappedProgressBar';

type Props = {
  currentStep: number;
  onNext: () => void;
};

export default function WrappedStep({ currentStep, onNext }: Props) {
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

  return (
    <div className="h-full aspect-[412/917] mx-auto relative overflow-hidden">
    <img
      src={wrappedImages[currentStep]}
      alt={`Wrapped step ${currentStep + 1}`}
      className="w-full h-full object-cover z-0"
    />
  
    <div className="absolute top-[1.5rem] w-full flex justify-center z-10">
      <WrappedProgressBar
        currentStep={currentStep}
        onComplete={() => setIsReady(true)}
      />
    </div>
  
    <div
      className={`absolute top-0 left-0 w-full h-full z-20 flex flex-col items-center justify-start ${
        isReady ? 'cursor-pointer' : 'cursor-default'
      }`}
      onClick={handleClick}
    />
  </div>
  
  );
}
