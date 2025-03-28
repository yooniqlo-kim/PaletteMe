import { useNavigate } from 'react-router-dom';
import wrapped06 from '@/assets/images/wrapped06.jpg';
import { ArtworkCard } from '@/shared/components/artworks/ArtworkCard';

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
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-white cursor-pointer px-4 text-center"
      onClick={handleClick}
    >
      <img
        src={wrapped06}
        alt="Wrapped End"
        className="w-[320px] shadow-md mb-6"
      />

      <div className="text-black space-y-4">
        <p className="text-lg font-semibold">
          전체 감상자 중 상위 {reviewPercentage}%!
        </p>
        <p className="text-md">올해 당신이 가장 좋아한 작가는</p>
        <p className="text-xl font-bold">{artistName}</p>

        <div className="flex justify-center mt-4">
          <ArtworkCard
            imageUrl={favoriteImg}
            overlayText="당신의 최애 작품"
            overlayTextPosition="bottomRight"
            size="small"
            theme="light"
            hasBorder
          />
        </div>

        <div className="mt-6">
          <p className="text-md mb-2">이런 작품도 좋아할지도 몰라요 👀</p>
          <p className="mt-2 text-sm">작가: {recommendedArtwork[0]}, {recommendedArtwork[1]}</p>
          <p className="mt-2 text-sm">작가: {recommendedArtist[0]}, {recommendedArtist[1]}</p>
        </div>
      </div>
    </div>
  );
}
