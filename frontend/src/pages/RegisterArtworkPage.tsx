import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";
import Button from "@/shared/components/buttons/Button";
import FormWrapper from "@/shared/components/form/FormWrapper";
import { updateField } from "@/store/formSlice";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const DUMMY = [
  {
    id: "1",
    imageUrl:
      "https://media.nga.gov/iiif/99758d9d-c10b-4d02-a198-7e49afb1f3a6/full/!750,900/0/default.jpg",
  },
  {
    id: "2",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNRf2p7etpn398gKJuWW3FTjsQ9VYDOjYP4A&s",
  },
  {
    id: "3",
    imageUrl:
      "https://smarthistory.org/wp-content/uploads/2019/04/Monet-Camille.jpg",
  },
  {
    id: "4",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/640px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  },
  {
    id: "5",
    imageUrl:
      "https://medias.artmajeur.com/standard/13567079_img-4438-kopia.jpg?v=1739250062",
  },
  {
    id: "6",
    imageUrl:
      "https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FOE80QzM-GsTloDUr0tdRog%2Fnormalized.jpg&width=910",
  },
  {
    id: "7",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlDkJLydQsfTFaL_r8QxxDck1gwVkOE3NZsA&s",
  },
  {
    id: "8",
    imageUrl:
      "https://www.museum-barberini.de/images/063_SL_Hart_Nibbrig_2.jpg?w=1600",
  },
  {
    id: "9",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT584WNedRjhkvof2C75tPqAqE5WRBAiz9KAA&s",
  },
  {
    id: "10",
    imageUrl:
      "https://blogimages.musement.com/2020/05/monet-impressionist-artist.jpg",
  },
];

export default function RegisterArtworkPage() {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const navigate = useNavigate();

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
        <ul className="grid grid-cols-2 gap-x-2 gap-y-4 w-full">
          {DUMMY.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={{
                artworkId: artwork.id,
                artworkImageUrl: artwork.imageUrl,
                title: "",
                isLiked: selectedImages.includes(artwork.id),
                artist: "",
              }}
              size="small"
              theme="light"
              onClickLike={() => handleClick(artwork.id)}
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
