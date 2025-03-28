import { Outlet, useLocation } from "react-router-dom";
import Container from "@/shared/components/layout/Container";
import Header from "@/shared/components/header/Header";
import NavBar from "@shared/components/navbar/NavBar";
import ScrollToTop from "@/shared/components/scroll/ScrollToTop";

export default function RootLayout() {
  const location = useLocation();

  const hiddenLayoutPaths = ["/login", "/signup", "/wrapped"];
  const shouldHideLayout = hiddenLayoutPaths.includes(location.pathname);

  return (
    <div className="relative h-screen w-screen bg-red-200 flex justify-center items-center">
      {!shouldHideLayout && <Header />}
      <Container id="scrollable-container" hidePadding={shouldHideLayout}>
        <ScrollToTop />
        <Outlet />
      </Container>
      {!shouldHideLayout && <NavBar />}
    </div>
  );
}
