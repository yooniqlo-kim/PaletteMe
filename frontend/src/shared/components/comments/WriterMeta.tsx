import { BaseUser } from "@/shared/types/user";
import { Lock } from "lucide-react";

export type WriterMetaProps = {
  user: BaseUser;
  date?: string; // 선택
  visibility?: string; // 댓글용
};

export function WriterMeta({ user, date, visibility }: WriterMetaProps) {
  const { profileImageUrl, nickname } = user;

  return (
    <div className="flex items-center max-w-xs gap-3 py-2 w-fit">
      <img
        src={profileImageUrl}
        alt={`${nickname}의 프로필`}
        className="object-cover w-8 h-8 rounded-full shrink-0"
      />
      <div className="flex items-center gap-2 truncate">
        <span className="text-xs font-medium">{nickname}</span>
        {/* date가 있을 때만 표시 */}
        {date && <span className="text-xs">{date}</span>}
        {visibility === "private" && (
          <Lock className="w-4 h-4 text-primary" /> // Lock icon only for "private"
        )}
      </div>
    </div>
  );
}
