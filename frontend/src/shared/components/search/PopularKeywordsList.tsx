import { useQuery } from '@tanstack/react-query';
import { fetchPopularArtworks } from '@/shared/api/ranking';

const fetchPopularKeywords = async (): Promise<string[]> => {
  return await fetchPopularArtworks();
};

interface Props {
  onKeywordClick: (keyword: string) => void;
}

export default function PopularKeywordsList({ onKeywordClick }: Props) {
  const { data, isLoading, error } = useQuery<string[]>({
    queryKey: ['popularKeywords'],
    queryFn: fetchPopularKeywords,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러가 발생했어요</p>;

  return (
    <div className="w-full max-w-[28rem] mx-auto px-1">
      <h2 className="text-md font-semibold mb-4 py-1">인기 작품</h2>
      <ul className="grid grid-cols-2 gap-y-2 text-sm text-gray-800">
        {data?.map((keyword, idx) => (
          <li
            key={keyword}
            className="cursor-pointer flex items-center w-full"
            onClick={() => onKeywordClick(keyword)}
          >
            <span className="text-red-500 font-semibold mr-1 min-w-[1.5rem]">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span className="truncate hover:underline">{keyword}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
