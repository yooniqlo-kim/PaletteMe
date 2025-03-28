import { useState } from "react";
import { BaseComment } from "@/shared/types/comment";
import { WriterMeta } from "./WriterMeta";
import { ThumbsUp } from "lucide-react";

export type CommentCardVariant = "list" | "detail";

export type CommentCardProps = {
  comment: BaseComment;
  variant?: CommentCardVariant;
  artworkImageUrl?: string;
  onClick?: (commentId: string) => void;
};

export function CommentCard({
  comment,
  artworkImageUrl,
  variant = "list",
  onClick,
}: CommentCardProps) {
  const { commentId, user, date, content, likeCount } = comment;

  const [expanded, setExpanded] = useState(false);

  const isDetailMode = variant === "detail";

  // 목록 모드에서만 감상문 상세로 이동
  const handleClick = () => {
    if (!isDetailMode && onClick) {
      onClick(commentId);
    }
  };

  const wrapperClassNames = `
    relative max-w-[23.75rem] rounded-pm overflow-hidden
    shadow-comment transition-all
    ${!isDetailMode ? "cursor-pointer" : ""}
  `;

  const wrapperStyle = getBackgroundStyle(isDetailMode, artworkImageUrl);

  return (
    <div
      onClick={handleClick}
      className={`${wrapperClassNames} ${
        isDetailMode ? "text-black" : "text-white"
      }`}
      style={wrapperStyle}
    >
      <div
        className={`p-4 flex flex-col ${
          isDetailMode ? "" : "backdrop-blur-xs bg-black/15"
        }`}
      >
        {/* 작성자 정보 및 좋아요 */}
        <div className="flex justify-between items-center">
          <WriterMeta user={user} date={date} />
          <div className="flex items-center gap-1 text-xs font-medium p-1">
            {likeCount}
            <ThumbsUp className="w-4 h-4" />
          </div>
        </div>
        {/* 댓글 내용 표시: 상세 모드면 더보기 기능*/}
        {isDetailMode ? (
          <DetailContent
            content={content}
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
          />
        ) : (
          <ListContent content={content} />
        )}
      </div>
    </div>
  );
}

// 리스트 모드에서 네 줄까지만
function ListContent({ content }: { content: string }) {
  return (
    <p className="text-xs font-normal leading-5 line-clamp-4">{content}</p>
  );
}

type DetailContentProps = {
  content: string;
  expanded: boolean;
  onToggle: () => void;
};

// 상세모드 더보기 및 간략히 토글
function DetailContent({ content, expanded, onToggle }: DetailContentProps) {
  const MAX_LENGTH = 120;
  const isLong = content.length > MAX_LENGTH;

  return (
    <div className="text-xs font-normal leading-5 text-black">
      <p className={expanded ? "" : "line-clamp-3"}>{content}</p>

      {isLong && (
        <button
          onClick={onToggle}
          className="mt-1 underline text-neutral-500 cursor-pointer"
        >
          {expanded ? "간략히" : "더보기"}
        </button>
      )}
    </div>
  );
}

// 배경 스타일 결정 함수
function getBackgroundStyle(isDetailMode: boolean, artworkImageUrl?: string) {
  // 상세 모드일 경우, 무조건 흰 배경
  if (isDetailMode) {
    return {
      backgroundColor: "#fff",
    };
  }

  if (artworkImageUrl) {
    return {
      backgroundImage: `url(${artworkImageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    };
  } else {
    return {
      backgroundColor: "#333",
    };
  }
}
