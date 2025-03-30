type SignupProgressBarProps = {
  currentStep: number;
};

export default function SignupProgressBar({ currentStep }: SignupProgressBarProps) {
  return (
    <div className="flex gap-2 w-full mb-6">
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          className="flex-1 h-[0.375rem]"
          style={{
            backgroundColor:
              i < currentStep
                ? "var(--color-primary)"
                : "var(--color-inactive)",
            borderRadius: "var(--radius-ps)",
          }}
        />
      ))}
    </div>
  );
}
