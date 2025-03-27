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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <TodayArtsPage />,
      },
      { path: "/search", element: <SearchPage /> },
      { path: "/mymuseum", element: <MymuseumPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/comment", element: <CommentPage /> },
      // {path: "/artwork/:id", element: <ArtworkPage />},
      { path: "/artwork", element: <ArtworkPage /> },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/wrapped",
    element: <WrappedPage />,
  },
]);

export default router;
