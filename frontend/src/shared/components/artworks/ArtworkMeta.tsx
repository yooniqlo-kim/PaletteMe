import { useNavigate } from "react-router";
import { ArtworkPreview } from "@/shared/types/artwork";

export type ArtworkMetaProps = {
  artwork: ArtworkPreview;
  showYear?: boolean;
  showLocation?: boolean;
};

export function ArtworkMeta({
  artwork,
  showYear = false,
  showLocation = false,
}: ArtworkMetaProps) {
  const { title, artist, year, location, artworkId } = artwork;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/artworks/${artworkId}`);
  };

  return (
    <div className="space-y-1">
      <h2
        className="text-md font-semibold truncate cursor-pointer hover:opacity-70"
        onClick={handleClick}
      >
        {title}
      </h2>
      <p className="text-sm font-semibold text-primary">{artist}</p>
      {showYear && year && (
        <p className="text-xs font-semibold text-neutral-8">제작연도 {year}</p>
      )}
      {showLocation && location && (
        <p className="text-xs font-semibold text-neutral-8">
          소장처 {location}
        </p>
      )}
    </div>
  );
}
