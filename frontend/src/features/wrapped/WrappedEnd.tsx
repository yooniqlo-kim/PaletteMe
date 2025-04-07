import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import wrapped06 from '@/assets/images/wrapped06.jpg';
import { ArtworkCard } from '@/shared/components/artworks/ArtworkCard';
import { Recommendation } from '@/shared/api/wrapped';
import DownloadButton from '@shared/components/buttons/DownloadButton';
import { getWrappedMonthString } from "@/shared/utils/date";

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
    navigate("/mymuseum");
  };

  const handleDownload = async () => {
    const target = document.getElementById("wrapped-capture");
    if (!target) return;

    const canvas = await html2canvas(target, {
      scrollY: -window.scrollY,
      useCORS: true,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "palette-wrapped.png";
    link.click();
  };

  return (
    <div
      id="wrapped-capture"
      className="w-full h-screen bg-[#ebebeb] flex items-center justify-center overflow-hidden"
    >
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
          className="flex-grow basis-[55%] bg-white px-6 py-4 flex flex-col justify-between text-left shadow-lg z-20 "
          style={{
            // borderTopLeftRadius: "var(--radius-ps)",
            // borderTopRightRadius: "var(--radius-ps)",
            color: "#333333",
          }}
          onClick={handleClick}
        >
          <div className="space-y-4 overflow-y-auto">
            <div>
              <p style={{ fontSize: "0.875rem", color: "#717171", marginBottom: "0.25rem" }}>
                감상평 수
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#ff385c" }}>
                  {reviewCount}개
                </p>
                <span style={{ fontSize: "1.25rem", color: "#000000", fontWeight: 500 }}>
                  감상평 상위 
                  <span style={{ color: "#ff385c" }}> {reviewPercentage} %</span>
                </span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: "0.875rem", color: "#717171", marginBottom: "0.25rem" }}>
                추천 작품
              </p>
              {recommendations[0] && (
                <>
                  <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#ff385c" }}>
                    {recommendations[0].title}
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "#5e5e5e" }}>
                    {recommendations[0].artist}
                  </p>
                </>
              )}
              {recommendations[1] && (
                <>
                  <p style={{ marginTop: "0.5rem", fontSize: "1rem", fontWeight: "bold", color: "#ff385c" }}>
                    {recommendations[1].title}
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "#5e5e5e" }}>
                    {recommendations[1].artist}
                  </p>
                </>
              )}
            </div>

            <div className="mb-1">
              <p style={{ fontSize: "0.875rem", color: "#717171", marginBottom: "0.25rem" }}>
                최애 화가
              </p>
              <p className="text-lg font-bold" style={{ color: "#ff385c" }}>
                {artistName}
              </p>
            </div>
          </div>

          {/* 푸터 */}
          <div>
            <div
              className="pt-4 border-t flex justify-between items-center text-sm"
              style={{ borderTop: "1px solid #d3d3d3", color: "#5e5e5e" }}
            >
              <img
                src="/src/assets/logos/MainLogo_142x24.svg"
                alt="PaletteMe"
                style={{ width: "142px", height: "20px" }}
              />
              <span>{getWrappedMonthString()} Wrapped</span>
            </div>

            {/* 버튼 */}
            <div className="pt-3 flex justify-center" data-html2canvas-ignore="true">
              <DownloadButton onClick={handleDownload} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
