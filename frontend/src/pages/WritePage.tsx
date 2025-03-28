import { ArtworkImage } from "@/features/detail/ArtworkImage";
import { WhiteContainer } from "@/shared/components/textbox/WhiteRoundedContainer";
import { artworkDummy } from "@/shared/dummy/artworkDummy";
import { WriteForm } from "@/features/write/WriteForm";

export default function WritePage() {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="bg-neutral-200 pt-2">
        <ArtworkImage artwork={artworkDummy} />
      </div>
      <WhiteContainer withTopRound withMarginTop>
        <WriteForm />
      </WhiteContainer>
    </div>
  );
}
