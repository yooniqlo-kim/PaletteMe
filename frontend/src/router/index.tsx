import { createBrowserRouter } from "react-router";
import RootLayout from "@/shared/components/layout/RootLayout";
import TodayArtsPage from "@/pages/TodayArtsPage";
import SearchPage from "@/pages/SearchPage";
import MymuseumPage from "@/pages/MymuseumPage";
import ProfilePage from "@/pages/ProfilePage";
import CommentPage from "@/pages/CommentPage";

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
      { path: "/comment", element: <CommentPage /> },
    ],
  },
]);

export default router;
