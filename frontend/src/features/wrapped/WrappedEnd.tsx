import { useNavigate } from 'react-router-dom';
import wrapped06 from '@/assets/images/wrapped06.jpg';
import { ArtworkCard } from '@/shared/components/artworks/ArtworkCard';
import { DownloadIcon } from 'lucide-react';

interface WrappedEndProps {
  reviewPercentage: number;
  artistName: string;
  favoriteImg: string;
  recommendedArtwork: string[];
  recommendedArtist: string[];
  recommendedImg: string[];
}

export default function WrappedEnd({
  reviewPercentage,
  artistName,
  favoriteImg,
  recommendedArtwork,
  recommendedArtist,
}: WrappedEndProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/mymuseum');
  };

  return (
<div className="relative w-full h-screen overflow-hidden bg-gray-200">
  {/* wrapped06 이미지 (고정 412x412) */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[412px] h-[412px] z-0">
    <img
      src={wrapped06}
      alt="Wrapped Background"
      className="w-full h-full object-cover"
    />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <ArtworkCard
        imageUrl={favoriteImg}
        size="small"
        theme="light"
        hasBorder
      />
    </div>
  </div>

  {/* 하단 카드: 어떤 화면에서도 517px 고정으로 보이게 (하단 고정) */}
  <div
    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[412px] h-[517px] bg-white px-6 py-4 flex flex-col justify-between text-left text-gray-800 shadow-lg z-20"
    onClick={handleClick}
  >
    <div className="space-y-4">
      <div>
        <p className="text-sm mb-1 text-gray-600">감상평 수</p>
        <p className="text-lg font-bold text-primary">
          N개 <span className="text-black font-medium">감상평 상위 {reviewPercentage}%</span>
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">추천 작품</p>
        <p className="text-base font-bold text-primary">{recommendedArtwork[0]}</p>
        <p className="text-sm text-gray-700">{recommendedArtist[0]}</p>
        <p className="mt-2 text-base font-bold text-primary">{recommendedArtwork[1]}</p>
        <p className="text-sm text-gray-700">{recommendedArtist[1]}</p>
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



  );
}
