import { getArtworks } from "@/shared/api/register";
import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";
import Button from "@/shared/components/buttons/Button";
import FormWrapper from "@/shared/components/form/FormWrapper";
import { updateField } from "@/store/formSlice";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function RegisterArtworkPage() {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const navigate = useNavigate();

  const {
    data = [],
    isFetching,
    error,
    isError,
  } = useQuery({
    queryKey: ["recommend"],
    queryFn: getArtworks,
  });

  useEffect(() => {
    if (selectedImages.length >= 4) {
      setErrorMsg("좋아하는 작품은 최대 3개까지 선택할 수 있습니다.");
    } else {
      setErrorMsg("");
    }
  }, [selectedImages.length]);

  function handleClick(id: string) {
    setSelectedImages((prev) =>
      selectedImages.includes(id)
        ? selectedImages.filter((artworkId) => artworkId !== id)
        : [...prev, id]
    );
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(selectedImages);
    dispatch(
      updateField({
        artworkId: [...selectedImages],
      })
    );
    navigate("/signup/color");
  }

  if (isFetching) {
    return <p>Returning...</p>;
  }

  return (
    <FormWrapper>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-8 w-full">
        <h2 className="text-lg font-semibold">
          좋아하는 작품을 3개 선택해주세요
        </h2>
        <ul className="grid grid-cols-2 gap-x-2 gap-y-4 w-full">
          {data.map((artwork: { artworkId: string; imageUrl: string }) => (
            <ArtworkCard
              key={artwork.artworkId}
              artwork={{
                artworkId: artwork.artworkId,
                artworkImageUrl: artwork.imageUrl,
                title: "",
                isLiked: selectedImages.includes(artwork.artworkId),
                artist: "",
              }}
              size="small"
              theme="light"
              onClickLike={() => handleClick(artwork.artworkId)}
              clickAction="like"
            />
          ))}
        </ul>
        {errorMsg && <p className="text-primary">{errorMsg}</p>}
        <Button size="XL" disabled={selectedImages.length !== 3}>
          다음으로
        </Button>
      </form>
    </FormWrapper>
  );
}
