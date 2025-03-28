type DescriptionBoxProps = {
  description?: string;
};

export function DescriptionBox({ description }: DescriptionBoxProps) {
  if (!description) return null;

  return (
    <div className="mt-3">
      <hr className="border-t border-neutral-300 mb-3" />
      <p className="text-sm leading-relaxed text-left">{description}</p>
    </div>
  );
}
