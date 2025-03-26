import { Outlet } from "react-router-dom";
import Container from "@/shared/components/layout/Container";
import Header from "@/shared/components/header/Header";
import NavBar from "@shared/components/navbar/NavBar";
import ScrollToTop from "@/shared/components/scroll/ScrollToTop";

export default function RootLayout() {
  return (
    <>
      <Container id="scrollable-container">
        <Header />
        <ScrollToTop />
        <Outlet />
        <NavBar />
      </Container>
    </>
  );
}
