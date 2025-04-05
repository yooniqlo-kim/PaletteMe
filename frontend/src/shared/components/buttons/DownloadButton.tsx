import IconButton from "@/shared/components/buttons/IconButton";
import IconDownload from "@/shared/components/icons/IconDownload";

interface DownloadButtonProps {
  onClick: () => void;
}

export default function DownloadButton({ onClick }: DownloadButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <IconButton
      identifier="review_detail"
      onClick={handleClick}
      className="!bg-transparent !border-none !shadow-none"
    >
      <div className="flex items-center gap-1">
        <IconDownload />
        <span className="text-black text-sm font-medium whitespace-nowrap">
          Share this wrapped
        </span>
      </div>
    </IconButton>
  );
}
