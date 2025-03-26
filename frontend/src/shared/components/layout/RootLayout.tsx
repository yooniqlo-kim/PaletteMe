import { Outlet } from "react-router-dom";
import Container from "@/shared/components/layout/Container";
import Header from "@/shared/components/header/Header";
import NavBar from "@shared/components/navbar/NavBar";

export default function RootLayout() {
  return (
    <>
      <Container>
        <Header />
        <Outlet />
        <NavBar />
      </Container>
    </>
  );
}
