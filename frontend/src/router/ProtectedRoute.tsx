import { useAuth } from "@/features/auth/useAuth";
import useToast from "@/shared/hooks/useToast";
import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { showToast } = useToast();
  const { isLoggedIn } = useAuth();
  const toastShownRef = useRef(false);

  // 상태 추가 → 리렌더링을 유도하지 않고 useEffect에서 처리
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isLoggedIn() && !toastShownRef.current) {
      showToast({ message: "로그인이 필요한 서비스입니다.", type: "error" });
      toastShownRef.current = true;
      setShouldRedirect(true); // 상태 변경으로 리렌더링 유도
    }
  }, [isLoggedIn, showToast]);

  if (shouldRedirect) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
