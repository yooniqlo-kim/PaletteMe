type DescriptionBoxProps = {
  description?: string;
  hideLine?: boolean;
};

export function DescriptionBox({
  description,
  hideLine = false,
}: DescriptionBoxProps) {
  if (!description) return null;

  return (
    <div className="mt-3">
      {!hideLine && <hr className="mb-3 border-t border-neutral-300" />}
      <p className="text-sm leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </div>
  );
}
