import { WriterMeta } from "./WriterMeta";
import { ThumbsUp } from "lucide-react";

type CommentCardProps = {
  profileImageUrl: string;
  nickname: string;
  date: string;
  content: string;
  likeCount: number;
  backgroundImageUrl?: string;
};

export function CommentCard({
  profileImageUrl,
  nickname,
  date,
  content,
  likeCount,
  backgroundImageUrl,
}: CommentCardProps) {
  return (
    <div
      className="relative max-w-[23.75rem] rounded-m overflow-hidden text-white shadow-md"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="backdrop-blur-xs bg-black/50 p-4 flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <WriterMeta
            profileImageUrl={profileImageUrl}
            nickname={nickname}
            date={date}
          />
          <div className="flex items-center gap-1 text-xs font-medium p-1">
            {likeCount}
            <ThumbsUp className="w-4 h-4" />
          </div>
        </div>
        <p className="text-xs font-normal leading-5 line-clamp-4">{content}</p>
      </div>
    </div>
  );
}
