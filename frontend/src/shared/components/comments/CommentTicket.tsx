import { ArtworkImage } from "../artworks/ArtworkImage";
import { ArtworkMeta } from "../artworks/ArtworkMeta";
import { WriterMeta } from "./WriterMeta";
import { ThumbsUp } from "lucide-react";

type CommentTicketProps = {
  artworkImageUrl: string;
  likeCount: number;
  title: string;
  artist: string;
  profileImageUrl: string;
  nickname: string;
  date: string;
  content: string;
};

export function CommentTicket({
  artworkImageUrl,
  likeCount,
  title,
  artist,
  profileImageUrl,
  nickname,
  date,
  content,
}: CommentTicketProps) {
  return (
    <div className="w-[20.5rem] rounded-xl shadow-lg bg-white overflow-hidden flex flex-col">
      <div className="relative">
        <ArtworkImage artworkImageUrl={artworkImageUrl} />
        <div className="absolute bottom-2 right-2 bg-white/80 rounded-full px-2 py-1 flex items-center gap-1 text-xs text-primary font-semibold">
          {likeCount}
          <ThumbsUp className="w-4 h-4 text-primary" />
        </div>
      </div>

      <div className="p-4 space-y-2">
        <ArtworkMeta title={title} artist={artist} />

        <WriterMeta
          profileImageUrl={profileImageUrl}
          nickname={nickname}
          date={date}
        />

        <p className="text-sm leading-relaxed text-gray-800 line-clamp-3">
          {content}
        </p>
      </div>
    </div>
  );
}
