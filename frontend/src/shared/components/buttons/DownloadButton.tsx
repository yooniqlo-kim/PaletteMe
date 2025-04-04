import IconButton from "@/shared/components/buttons/IconButton";
import IconDownload from "@/shared/components//icons/IconDownload";

interface DownloadButtonProps {
  onClick: () => void;
}

export default function DownloadButton({ onClick }: DownloadButtonProps) {
  return (
    <IconButton identifier="review_detail" onClick={onClick}>
      <IconDownload />
      <span className="ml-1 text-black text-sm font-medium">다운로드</span>
    </IconButton>
  );
}
