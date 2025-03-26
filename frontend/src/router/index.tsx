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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <TodayArtsPage />,
      },
      { path: "/search", element: <SearchPage /> },
      { path: "/mymuseum", element: <MymuseumPage /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },
]);

export default router;
