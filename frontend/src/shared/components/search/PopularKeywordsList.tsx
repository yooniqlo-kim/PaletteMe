import { useQuery } from '@tanstack/react-query';
import { popularKeywordsDummy } from '@shared/dummy/popularKeywordsDummy';

const fetchPopularKeywords = async (): Promise<string[]> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(popularKeywordsDummy), 500)
  );
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
    <div>
      <h2 className="text-lg font-semibold mb-2">인기 검색어</h2>
      <ul className="grid grid-cols-2 gap-y-2 text-sm text-gray-800">
        {data?.map((keyword, idx) => (
          <li
            key={keyword}
            className="cursor-pointer hover:underline"
            onClick={() => onKeywordClick(keyword)}
          >
            <span className="text-red-500 font-semibold mr-1">
              {String(idx + 1).padStart(2, '0')}
            </span>
            {keyword}
          </li>
        ))}
      </ul>
    </div>
  );
}
