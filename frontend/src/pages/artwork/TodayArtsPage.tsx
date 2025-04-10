import { Navigate, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ArtworkDetail } from "@/features/detail/ArtworkDetail";
import { getTodayArtworkIn, getTodayArtworkOut } from "@/shared/api/artwork";
import { ArtworkDetailData } from "@/shared/types/artwork";
import { mapToArtworkDetail } from "@/shared/utils/mapToArtworkDetail";
import { ArtworkDetailSkeleton } from "@/features/detail/ArtworkDetailSkeleton";

export default function TodayArtsPage() {
  const isLoggedIn = JSON.parse(
    sessionStorage.getItem("user") as string
  )?.nickname;
  const [artwork, setArtwork] = useState<ArtworkDetailData | null>(null);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const res = isLoggedIn
          ? await getTodayArtworkIn() // 로그인 유저용
          : await getTodayArtworkOut(); // 비로그인 유저용
        const mapped = mapToArtworkDetail(res, res.artworkId);
        setArtwork(mapped);
      } catch (err) {
        console.error("작품 로딩 에러:", err);
        setHasError(true);
      }
    };

    fetchArtwork();
  }, [isLoggedIn, navigate]);

  if (hasError) return <Navigate to="/error" replace />;
  if (!artwork) {
    return <ArtworkDetailSkeleton />;
  }

  return <ArtworkDetail artwork={artwork} />;
}
