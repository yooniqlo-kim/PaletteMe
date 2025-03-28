import { createBrowserRouter } from "react-router";
import RootLayout from "@/shared/components/layout/RootLayout";
import TodayArtsPage from "@/pages/TodayArtsPage";
import SearchPage from "@/pages/SearchPage";
import MymuseumPage from "@/pages/MymuseumPage";
import ProfilePage from "@/pages/ProfilePage";
import CommentPage from "@/pages/CommentPage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import WrappedPage from "@/pages/WrappedPage";
import ArtworkPage from "@/pages/ArtworkPage";
import NotFoundPage from "@/pages/NotFoundPage";
import WritePage from "@/pages/WritePage";
import LevelInfoPage from "@/pages/LevelInfoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <TodayArtsPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/mymuseum", element: <MymuseumPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/profile/level", element: <LevelInfoPage /> },
      { path: "/comment", element: <CommentPage /> },
      { path: "/artwork", element: <ArtworkPage /> },
      { path: "/write", element: <WritePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <RegisterPage /> },
      { path: "/wrapped", element: <WrappedPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
