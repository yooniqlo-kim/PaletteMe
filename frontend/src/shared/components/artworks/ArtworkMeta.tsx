type ArtworkMetaProps = {
  artworkId?: string;
  title: string;
  artist: string;
  year?: string;
  location?: string;
  showYear?: boolean;
  showLocation?: boolean;
};

export function ArtworkMeta({
  title,
  artist,
  year,
  location,
  showYear = false,
  showLocation = false,
}: ArtworkMetaProps) {
  return (
    <div className="space-y-1">
      <h2 className="text-md font-semibold truncate">{title}</h2>
      <p className="text-sm font-semibold text-primary">{artist}</p>
      {showYear && year && (
        <p className="text-xs font-semibold text-netural-8">제작연도 {year}</p>
      )}
      {showLocation && location && (
        <p className="text-xs font-semibold text-netural-8">
          소장처 {location}
        </p>
      )}
    </div>
  );
}
