type ArtworkImageProps = {
  artworkImageUrl: string;
};

export function ArtworkImage({ artworkImageUrl }: ArtworkImageProps) {
  return (
    <a
      href={artworkImageUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-[380px] mx-auto"
    >
      <div
        className="aspect-[23.75/22.375] rounded-pm bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${artworkImageUrl})` }}
      />
    </a>
  );
}
