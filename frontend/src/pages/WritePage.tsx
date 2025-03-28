import { ArtworkImage } from "@/shared/components/artworks/ArtworkImage";
import { ArtworkMeta } from "@/shared/components/artworks/ArtworkMeta";
import { KeywordSuggester } from "@/features/write/KeywordSuggester";
import { TextArea } from "@/features/write/TextArea";
import { VisibilityToggle } from "@/features/write/VisibilityToggle";
import { WhiteContainer } from "@/shared/components/textboxes/WhiteRoundedContainer";
import Button from "@/shared/components/Buttons/Button";
import { artworkDummy } from "@/shared/dummy/artworkDummy";

export default function WritePage() {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="bg-neutral-200  pt-2">
        <ArtworkImage artwork={artworkDummy} />
      </div>
      <WhiteContainer withTopRound withMarginTop>
        <div className="flex flex-col gap-4">
          <ArtworkMeta artwork={artworkDummy} showYear showLocation />
          <KeywordSuggester />
          <TextArea />
          <VisibilityToggle />
          <Button size="XL">등 록</Button>
        </div>
      </WhiteContainer>
    </div>
  );
}
