import { ArtworkImage } from "./ArtworkImage";
import { ArtworkMeta } from "@/shared/components/artworks/ArtworkMeta";
import { DescriptionBox } from "./DescriptionBox";
import { AIDocentBox } from "./AIDocentBox";
import { CommentBox } from "./CommentBox";
import { WhiteContainer } from "@/shared/components/textbox/WhiteRoundedContainer";

import { artworkDummy } from "@/shared/dummy/artworkDummy";
import { commentDummy } from "@/shared/dummy/commentDummy";
import { aiDocentResponses } from "@/shared/dummy/aiDocentRes";

export function ArtworkDetail() {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="bg-neutral-200 pt-2">
        <ArtworkImage artwork={artworkDummy} />
      </div>
      <div className="flex flex-col gap-2">
        <WhiteContainer withTopRound withMarginTop>
          <ArtworkMeta artwork={artworkDummy} showYear showLocation />
          <DescriptionBox description={artworkDummy.description} />
        </WhiteContainer>
        <WhiteContainer>
          <AIDocentBox
            onFetchExplanation={() =>
              new Promise((res) =>
                setTimeout(() => res(aiDocentResponses["1"]), 1500)
              )
            }
          />
        </WhiteContainer>
        <WhiteContainer>
          <CommentBox comments={commentDummy} />
        </WhiteContainer>
      </div>
    </div>
  );
}
