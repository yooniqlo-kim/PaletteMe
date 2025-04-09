import { BaseUser } from "@/shared/types/user";

export type WriterMetaProps = {
  user: BaseUser;
  date?: string; // 선택
};

export function WriterMeta({ user, date }: WriterMetaProps) {
  const { profileImageUrl, nickname } = user;

  return (
    <div className="flex items-center gap-3 py-2 max-w-xs w-fit">
      <img
        src={profileImageUrl}
        alt={`${nickname}의 프로필`}
        className="w-8 h-8 rounded-full object-cover shrink-0"
      />
      <div className="flex items-center gap-2 truncate">
        <span className="text-xs font-medium">{nickname}</span>
        {/* date가 있을 때만 표시 */}
        {date && <span className="text-xs">{date}</span>}
      </div>
    </div>
  );
}
