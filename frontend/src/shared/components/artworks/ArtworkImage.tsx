type ArtworkImageProps = {
  imageUrl: string;
};

export function ArtworkImage({ imageUrl }: ArtworkImageProps) {
  return (
    <a
      href={imageUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-[380px] mx-auto"
    >
      <div
        className="aspect-[23.75/22.375] rounded-m bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    </a>
  );
}
