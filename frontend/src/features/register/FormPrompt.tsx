import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectOnRefresh() {
  const navigate = useNavigate();

  useEffect(() => {
    const navEntry = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    const isReloaded = navEntry?.type === "reload";

    if (isReloaded) {
      alert("페이지를 새로고침했습니다. 회원가입 첫페이지로 이동합니다.");
      navigate("/signup");
    }
  }, [navigate]);

  return null;
}
