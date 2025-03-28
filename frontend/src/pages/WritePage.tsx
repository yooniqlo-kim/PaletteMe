import { ArtworkImage } from "@/shared/components/artworks/ArtworkImage";
import { ArtworkMeta } from "@/shared/components/artworks/ArtworkMeta";
import { KeywordSuggester } from "@/shared/components/textboxes/KeywordSuggester";
import { TextArea } from "@/shared/components/textboxes/TextArea";
import { WhiteContainer } from "@/shared/components/textboxes/WhiteRoundedContainer";

import { artworkDummy } from "@/shared/dummy/artworkDummy";

export default function WritePage() {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="bg-neutral-200  pt-2">
        <ArtworkImage artwork={artworkDummy} />
      </div>
      <WhiteContainer withTopRound withMarginTop>
        <ArtworkMeta artwork={artworkDummy} showYear showLocation />
        <KeywordSuggester />
        <TextArea />
      </WhiteContainer>
    </div>
  );
}
