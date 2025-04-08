import { useNavigate, useLocation } from "react-router-dom";
import IconBack from "../icons/IconBack";
import MainLogo from "@/assets/logos/MainLogo_500x80.svg";

export default function Header() {
  const navigate = useNavigate();

  const location = useLocation();

  // 네비게이션바의 루트 페이지일 경우, 뒤로가기 버튼을 숨김
  const tabRootPaths = ["/", "/search", "/profile", "/mymuseum"];
  const isRootPage =
    tabRootPaths.includes(location.pathname) && location.search === "";

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[25.75rem] h-[3.25rem] flex items-center justify-between bg-white z-50 px-4">
      {isRootPage ? (
        <div className="w-[2.625rem]" />
      ) : (
        <button
          onClick={() => navigate(-1)}
          className="w-[2.625rem] h-[2.625rem] flex items-center justify-center"
        >
          <IconBack />
        </button>
      )}
      <img
        src={MainLogo}
        alt="PaletteMe 로고"
        onClick={() => navigate("/")}
        className="h-[20px] max-[430px]:h-[18px] max-[375px]:h-[16px] object-contain mx-auto cursor-pointer"
      />
      <div className="w-[2.625rem]" />
    </header>
  );
}
