import { useEffect, useState } from 'react';

type Props = {
  currentStep: number;
  onComplete?: () => void;
};

export default function WrappedProgressBar({ currentStep, onComplete }: Props) {
  const [animatedSteps, setAnimatedSteps] = useState<boolean[]>(Array(5).fill(false));

  useEffect(() => {
    const updated = [...animatedSteps];
    updated[currentStep] = false; // 초기화

    setAnimatedSteps(updated);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const next = [...updated];
        next[currentStep] = true;
        setAnimatedSteps(next);
      });
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
    <div className="flex justify-center items-center gap-[1rem] w-[23.6875rem] h-[0.375rem] shrink-0 z-50">
      {[...Array(5)].map((_, i) => {
        // 지난 스텝은 이미 꽉 참
        if (i < currentStep) {
          return (
            <div
              key={i}
              className="w-[3.9375rem] h-[0.375rem] rounded-[0.5rem] bg-[var(--primary,#FF385C)] shrink-0"
            />
          );
        }

        // 현재 스텝만 애니메이션
        if (i === currentStep) {
          return (
            <div
              key={i}
              className="w-[3.9375rem] h-[0.375rem] rounded-[0.5rem] bg-neutral-200 overflow-hidden shrink-0"
            >
              <div
                className={`h-full bg-[var(--primary,#FF385C)] transition-[width] duration-700 ease-in-out`}
                style={{ width: animatedSteps[i] ? '100%' : '0%' }}
              />
            </div>
          );
        }

        // 미래 스텝
        return (
          <div
            key={i}
            className="w-[3.9375rem] h-[0.375rem] rounded-[0.5rem] bg-neutral-200 shrink-0"
          />
        );
      })}
    </div>
  );
}
