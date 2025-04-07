import { Navigate, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ArtworkDetail } from "@/features/detail/ArtworkDetail";
// 임시
import { getArtworkDetail } from "@/shared/api/artwork";
import { ArtworkDetailData } from "@/shared/types/artwork";
import { mapToArtworkDetail } from "@/shared/utils/mapToArtworkDetail";
import { ArtworkDetailSkeleton } from "@/features/detail/ArtworkDetailSkeleton";

export default function TodayArtsPage() {
  //임시
  const artworkId = "c7d93800f20b0dcba0b1f35b437a7f84f511bf09b4253381f24f120549c791d4";

  //const { artworkId } = useParams<{ artworkId: string }>();
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
    return <ArtworkDetailSkeleton />;
  }

  return <ArtworkDetail artwork={artwork} />;
}
