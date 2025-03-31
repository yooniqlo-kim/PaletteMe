import { createBrowserRouter } from "react-router";
import RootLayout from "@/shared/components/layout/RootLayout";
import TodayArtsPage from "@/pages/TodayArtsPage";
import SearchPage from "@/pages/SearchPage";
import MymuseumPage from "@/pages/MymuseumPage";
import LikedCollectionPage from "@/pages/LikedCollectionPage";
import BookmarkCollectionPage from "@/pages/BookmarkCollectionPage";
import CalenderPage from "@/pages/CalenderPage";
import ProfilePage from "@/pages/ProfilePage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import WrappedPage from "@/pages/WrappedPage";
import ArtworkPage from "@/pages/ArtworkPage";
import NotFoundPage from "@/pages/NotFoundPage";
import WritePage from "@/pages/WritePage";
import LevelInfoPage from "@/pages/LevelInfoPage";
import CommentCollectionPage from "@/pages/CommentCollectionPage";
import ConfirmPasswordPage from "@/pages/ConfirmPasswordPage";
import UpdateUserInfoPage from "@/pages/UpdateUserInfoPage";
import ConfirmDeleteAccountPage from "@/pages/ConfirmDeleteAccountPage";
import CompleteDeleteAccountPage from "@/pages/CompleteDeleteAccountPage";
import UpdateProfilePage from "@/pages/UpdateProfilePage";
import CommentDetailPage from "@/pages/CommentDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <TodayArtsPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/mymuseum", element: <MymuseumPage /> },
      { path: "/mymuseum/calendar", element: <CalenderPage /> },
      { path: "/mymuseum/liked", element: <LikedCollectionPage /> },
      { path: "/mymuseum/bookmark", element: <BookmarkCollectionPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "profile/level", element: <LevelInfoPage /> },
      { path: "profile/confirm", element: <ConfirmPasswordPage /> },
      { path: "profile/update", element: <UpdateUserInfoPage /> },
      { path: "profile/update-profile", element: <UpdateProfilePage /> },
      { path: "profile/delete", element: <ConfirmDeleteAccountPage /> },
      {
        path: "profile/delete/complete",
        element: <CompleteDeleteAccountPage />,
      },
      { path: "/artwork", element: <ArtworkPage /> },
      { path: "/write", element: <WritePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <RegisterPage /> },
      { path: "/wrapped", element: <WrappedPage /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "/commentcollection", element: <CommentCollectionPage /> },
      // {path: "/comment/:commentId", element: <CommentDetailPage />},
      { path: "/commentdetail", element: <CommentDetailPage /> },
    ],
  },
]);

export default router;
