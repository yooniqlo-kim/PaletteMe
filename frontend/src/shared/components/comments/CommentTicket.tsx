import { ArtworkImage } from "../artworks/ArtworkImage";
import { ArtworkMeta } from "../artworks/ArtworkMeta";
import { WriterMeta } from "./WriterMeta";
import { ThumbsUp } from "lucide-react";

type CommentTicketProps = {
  commentId?: string;
  artworkImageUrl: string;
  likeCount: number;
  title: string;
  artist: string;
  profileImageUrl: string;
  nickname: string;
  date: string;
  content: string;
  onClick?: (commentId: string) => void;
};

export function CommentTicket({
  commentId,
  artworkImageUrl,
  likeCount,
  title,
  artist,
  profileImageUrl,
  nickname,
  date,
  content,
  onClick,
}: CommentTicketProps) {
  return (
    <div
      onClick={() => commentId && onClick?.(commentId)}
      className="w-full max-w-[17rem] h-[35rem] rounded-m bg-white overflow-hidden flex flex-col cursor-pointer shadow-[0_4px_20px_8px_rgba(34,34,34,0.25)]"
    >
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
        <p className="text-xs leading-relaxed line-clamp-6">{content}</p>
      </div>
    </div>
  );
}
