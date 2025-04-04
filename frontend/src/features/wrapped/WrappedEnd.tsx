import { useNavigate } from 'react-router-dom';
import wrapped06 from '@/assets/images/wrapped06.jpg';
import { ArtworkCard } from '@/shared/components/artworks/ArtworkCard';
import { DownloadIcon } from 'lucide-react';
import { Recommendation } from '@/shared/api/wrapped';

interface WrappedEndProps {
  reviewCount: number;
  reviewPercentage: number;
  artistName: string;
  favoriteArtwork: {
    title: string;
    artist: string;
    imgUrl: string;
  };
  recommendations: Recommendation[];
}

export default function WrappedEnd({
  reviewCount,
  reviewPercentage,
  artistName,
  favoriteArtwork,
  recommendations = [],
}: WrappedEndProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/mymuseum');
  };

  return (
    <div className="w-full h-screen bg-gray-200 flex items-center justify-center overflow-hidden">
      <div className="flex flex-col w-full h-full max-w-[500px] mx-auto overflow-hidden">

        {/* 상단 이미지 */}
        <div
          className="flex-grow basis-[45%] relative bg-cover bg-center"
          style={{ backgroundImage: `url(${wrapped06})` }}
        >
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-full max-w-[180px]">
              <ArtworkCard
                artwork={{
                  artworkId: "fake-id",
                  artworkImageUrl: favoriteArtwork.imgUrl,
                  title: favoriteArtwork.title,
                  isLiked: false,
                  artist: favoriteArtwork.artist,
                }}
                size="small"
                theme="light"
                hasBorder
              />
            </div>
          </div>
        </div>

        {/* 하단 카드 */}
        <div
          className="flex-grow basis-[55%] bg-white px-6 py-4 flex flex-col justify-between text-left text-gray-800 shadow-lg z-20"
          style={{
            borderTopLeftRadius: 'var(--radius-ps)',
            borderTopRightRadius: 'var(--radius-ps)',
          }}
          onClick={handleClick}
        >
          <div className="space-y-4 overflow-y-auto">
            <div>
              <p className="text-sm mb-1 text-gray-600">감상평 수</p>
              <p className="text-lg font-bold text-primary">
                {reviewCount}개 <span className="text-black font-medium">감상평 상위 {reviewPercentage}%</span>
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">추천 작품</p>
              {recommendations[0] && (
                <>
                  <p className="text-base font-bold text-primary">{recommendations[0].title}</p>
                  <p className="text-sm text-gray-700">{recommendations[0].artist}</p>
                </>
              )}
              {recommendations[1] && (
                <>
                  <p className="mt-2 text-base font-bold text-primary">{recommendations[1].title}</p>
                  <p className="text-sm text-gray-700">{recommendations[1].artist}</p>
                </>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">최애 화가</p>
              <p className="text-xl font-bold text-primary">{artistName}</p>
            </div>
          </div>

          <div>
            <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-gray-500 text-sm">
              <span className="font-bold text-lg">PaletteMe</span>
              <span>2025 03 Wrapped</span>
            </div>

            <div className="pt-3 flex items-center justify-center gap-2">
              <DownloadIcon size={18} />
              <span className="text-sm text-black font-medium">Share this wrapped</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
