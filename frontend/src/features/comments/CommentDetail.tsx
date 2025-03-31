import { ArtworkImage } from "../detail/ArtworkImage";
import { ArtworkMeta } from "@/shared/components/artworks/ArtworkMeta";
import { WhiteContainer } from "@/shared/components/textbox/WhiteRoundedContainer";
import { DescriptionBox } from "../detail/DescriptionBox";

import { artworkDummy } from "@/shared/dummy/artworkDummy";
import { commentDummy } from "@/shared/dummy/commentDummy";

export function CommentDetail() {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="bg-neutral-200 pt-2">
        <ArtworkImage artwork={artworkDummy} />
      </div>
      <div className="flex flex-col gap-2">
        <WhiteContainer withTopRound withMarginTop>
          <div className="relative">
            <div className="absolute -top-9 right-1 flex gap-2 z-10"></div>
            <ArtworkMeta artwork={artworkDummy} showYear showLocation />
            <DescriptionBox description={commentDummy[0].content} />
          </div>
        </WhiteContainer>
      </div>
    </div>
  );
}
