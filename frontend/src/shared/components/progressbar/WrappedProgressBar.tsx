import { useEffect, useState } from 'react';

type Props = {
  currentStep: number;
  onComplete?: () => void;
};

export default function WrappedProgressBar({ currentStep, onComplete }: Props) {
  const [animatedSteps, setAnimatedSteps] = useState<boolean[]>(Array(5).fill(false));

  useEffect(() => {
    setAnimatedSteps(prev => {
      const updated = [...prev];
      updated[currentStep] = false;
  
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimatedSteps(prev2 => {
            const next = [...prev2];
            next[currentStep] = true;
            return next;
          });
        });
      });
  
      return updated;
    });
  }, [currentStep]);
  

  useEffect(() => {
    if (animatedSteps[currentStep]) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animatedSteps, currentStep, onComplete]);

  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 w-full max-w-[23.6875rem] h-[0.375rem] px-4 sm:px-0 shrink-0 z-50 mx-auto">
      {[...Array(5)].map((_, i) => {
        const isPast = i < currentStep;
        const isCurrent = i === currentStep;
  
        return (
          <div
            key={i}
            className={`h-[0.375rem] rounded-[0.5rem] shrink-0 transition-colors duration-300 ${
              isPast
                ? 'bg-[var(--primary,#FF385C)] w-[15%] sm:w-[3.9375rem]'
                : isCurrent
                ? 'bg-neutral-200 overflow-hidden w-[15%] sm:w-[3.9375rem]'
                : 'bg-neutral-200 w-[15%] sm:w-[3.9375rem]'
            }`}
          >
            {isCurrent && (
              <div
                className={`h-full bg-[var(--primary,#FF385C)] transition-[width] duration-700 ease-in-out`}
                style={{ width: animatedSteps[i] ? '100%' : '0%' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
