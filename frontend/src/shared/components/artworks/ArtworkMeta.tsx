import { useNavigate } from "react-router";
import { ArtworkPreview } from "@/shared/types/artwork";
import { getLocationLink } from "@/shared/utils/location";

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

  const handleLocationClick = () => {
    const url = getLocationLink(location!);
    window.open(url, "_blank");
  };

  const handleArtistClick = () => {
    navigate(`/search?query=${encodeURIComponent(artist)}`);
  };

  return (
    <div className="space-y-1">
      <h2
        className="font-semibold truncate cursor-pointer text-md hover:opacity-70"
        onClick={handleClick}
      >
        {title}
      </h2>
      <p
        className="text-sm font-semibold cursor-pointer text-primary hover:opacity-70"
        onClick={handleArtistClick}
      >
        {artist}
      </p>
      {showYear && year && (
        <p className="text-xs font-semibold text-neutral-8">제작연도 {year}</p>
      )}
      {showLocation && location && (
        <p className="text-xs font-semibold text-neutral-8">
          소장처{" "}
          <span
            onClick={handleLocationClick}
            className="cursor-pointer hover:opacity-70"
          >
            {location}
          </span>
        </p>
      )}
    </div>
  );
}
