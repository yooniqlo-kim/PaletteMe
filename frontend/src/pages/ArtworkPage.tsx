import { useParams, Navigate, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ArtworkDetail } from "@/features/detail/ArtworkDetail";
import { getArtworkDetail } from "@/shared/api/artwork";
import { ArtworkDetailData } from "@/shared/types/artwork";
import { mapToArtworkDetail } from "@/shared/utils/mapToArtworkDetail";

export default function ArtworkPage() {
  const { artworkId } = useParams<{ artworkId: string }>();
  const [artwork, setArtwork] = useState<ArtworkDetailData | null>(null);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!artworkId) {
      navigate("/not-found", { replace: true });
      return;
    }

    const fetchArtwork = async () => {
      try {
        const res = await getArtworkDetail(artworkId);
        const mapped = mapToArtworkDetail(res, artworkId);
        setArtwork(mapped);
      } catch (err) {
        console.error("작품 로딩 에러:", err);
        setHasError(true);
      }
    };

    fetchArtwork();
  }, [artworkId, navigate]);

  if (hasError) return <Navigate to="/error" replace />;

  if (!artwork) {
    return <div className="p-4">작품 정보를 불러오는 중입니다...</div>;
  }

  return <ArtworkDetail artwork={artwork} />;
}
