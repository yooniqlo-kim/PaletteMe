import { Outlet } from "react-router-dom";
import Container from "@/shared/components/layout/Container";
import Header from "@/shared/components/header/Header";
import NavBar from "@shared/components/navbar/NavBar";
import ScrollToTop from "@/shared/components/scroll/ScrollToTop";

export default function RootLayout() {
  return (
    <div className="relative h-screen w-screen bg-red-200 flex justify-center items-center">
      <Header />
      <Container>
        <ScrollToTop />
        <Outlet />
      </Container>
      <NavBar />
    </div>
  );
}

