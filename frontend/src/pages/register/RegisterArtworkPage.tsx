import { useRecommendArtworks } from "@/features/register/useRecommendArtworks";
import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";
import Button from "@/shared/components/buttons/Button";
import FormWrapper from "@/shared/components/form/FormWrapper";
import { updateField } from "@/store/formSlice";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function RegisterArtworkPage() {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const navigate = useNavigate();

  const { data, isFetching } = useRecommendArtworks();

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

  return (
    <FormWrapper>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-8 w-full">
        <h2 className="text-lg font-semibold">
          좋아하는 작품을 3개 선택해주세요
        </h2>
        {isFetching ? (
          <div className="w-full flex justify-center items-center py-10">
            <p className="text-primary">작품을 불러오는 중입니다.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-x-2 gap-y-4 w-full">
            {data.map((artwork: { artworkId: string; imageUrl: string }) => (
              <ArtworkCard
                key={artwork.artworkId}
                artwork={{
                  artworkId: artwork.artworkId,
                  artworkImageUrl: artwork.imageUrl,
                  title: "",
                  artist: "",
                }}
                isLiked={selectedImages.includes(artwork.artworkId)}
                size="small"
                theme="light"
                onClickLike={() => handleClick(artwork.artworkId)}
                clickAction="like"
              />
            ))}
          </ul>
        )}
        {errorMsg && <p className="text-primary">{errorMsg}</p>}
        <Button size="XL" disabled={selectedImages.length !== 3}>
          다음으로
        </Button>
      </form>
    </FormWrapper>
  );
}
