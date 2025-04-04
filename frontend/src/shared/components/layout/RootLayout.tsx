import { Outlet, useLocation } from "react-router-dom";
import Header from "@/shared/components/header/Header";
import NavBar from "@shared/components/navbar/NavBar";
import ScrollToTop from "@/shared/components/scroll/ScrollToTop";

export default function RootLayout() {
  const location = useLocation();

  const hiddenLayoutPaths = [
    "/login",
    "/signup",
    "/signup/profile",
    "/signup/artwork",
    "/signup/color",
    "/signup/complete",
    "/wrapped",
  ];
  const shouldHideLayout = hiddenLayoutPaths.includes(location.pathname);

  return (
    <div className="h-screen overflow-hidden flex justify-center bg-[var(--color-neutral-2)]">
      <div className="w-[412px] h-screen flex flex-col bg-white">
        {!shouldHideLayout && <Header />}

        <main
          id="scrollable-container"
          className="flex-1 overflow-y-auto pt-[3.25rem] pb-[3.75rem]"
        >
          {!shouldHideLayout && <ScrollToTop />}
          <Outlet />
        </main>

        {!shouldHideLayout && <NavBar />}
      </div>
    </div>
  );
}

