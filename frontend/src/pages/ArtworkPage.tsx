import { ArtworkImage } from "@/shared/components/artworks/ArtworkImage";
import { ArtworkMeta } from "@/shared/components/artworks/ArtworkMeta";
import { DescriptionBox } from "@/shared/components/textboxes/DescriptionBox";
import { WhiteContainer } from "@/shared/components/textboxes/WhiteRoundedContainer";
import { CommentBox } from "@/shared/components/textboxes/CommentBox";
import { AIDocentBox } from "@/shared/components/textboxes/AIDocentBox";

import { artworkDummy } from "@/shared/dummy/artworkDummy";
import { commentDummy } from "@/shared/dummy/commentDummy";
import { aiDocentResponses } from "@/shared/dummy/aiDocentRes";

export default function ArtworkPage() {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="bg-neutral-200  pt-2">
        <ArtworkImage artwork={artworkDummy} />
      </div>
      <WhiteContainer withTopRound withMarginTop>
        <ArtworkMeta artwork={artworkDummy} showYear showLocation />
        <DescriptionBox description={artworkDummy.description} />
      </WhiteContainer>

      <WhiteContainer className="mt-2">
        <AIDocentBox
          onFetchExplanation={() =>
            new Promise((res) =>
              setTimeout(() => res(aiDocentResponses["1"]), 1500)
            )
          }
        />
      </WhiteContainer>

      <WhiteContainer className="mt-2 pb-28">
        <CommentBox comments={commentDummy} />
      </WhiteContainer>
    </div>
  );
}
