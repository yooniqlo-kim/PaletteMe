type WriterMetaProps = {
  profileImageUrl: string;
  nickname: string;
  date: string;
};

export function WriterMeta({
  profileImageUrl,
  nickname,
  date,
}: WriterMetaProps) {
  return (
    <div className="flex items-center gap-3 px-2 py-2 max-w-xs w-fit">
      <img
        src={profileImageUrl}
        alt={`${nickname}의 프로필`}
        className="w-8 h-8 rounded-full object-cover shrink-0"
      />
      <div className="flex items-center gap-2 truncate">
        <span className="text-xs font-medium">{nickname}</span>
        <span className="text-xs">{date}</span>
      </div>
    </div>
  );
}
