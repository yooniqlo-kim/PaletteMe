import { BaseArtwork } from "@/shared/types/artwork";

export type ArtworkMetaProps = {
  artwork: BaseArtwork;
  showYear?: boolean;
  showLocation?: boolean;
};

export function ArtworkMeta({
  artwork,
  showYear = false,
  showLocation = false,
}: ArtworkMetaProps) {
  const { title, artist, year, location } = artwork;
  return (
    <div className="space-y-1">
      <h2 className="text-md font-semibold truncate">{title}</h2>
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
