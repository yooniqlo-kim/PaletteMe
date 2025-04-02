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
      {!hideLine && <hr className="border-t border-neutral-300 mb-3" />}
      <p className="text-sm leading-relaxed text-left">{description}</p>
    </div>
  );
}
