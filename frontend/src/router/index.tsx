import { createBrowserRouter } from "react-router";
import RootLayout from "@/shared/components/layout/RootLayout";
import TodayArtsPage from "@/pages/TodayArtsPage";
import SearchPage from "@/pages/SearchPage";
import MymuseumPage from "@/pages/MymuseumPage";
import LikedCollectionPage from "@/pages/LikedCollectionPage";
import BookmarkCollectionPage from "@/pages/BookmarkCollectionPage";
import CalenderPage from "@/pages/CalenderPage";
import ProfilePage from "@/pages/ProfilePage";
import LoginPage from "@/pages/LoginPage";
import WrappedPage from "@/pages/WrappedPage";
import ArtworkPage from "@/pages/ArtworkPage";
import NotFoundPage from "@/pages/NotFoundPage";
import WritePage from "@/pages/CommentWritePage";
import LevelInfoPage from "@/pages/LevelInfoPage";
import ConfirmPasswordPage from "@/pages/ConfirmPasswordPage";
import UpdateUserInfoPage from "@/pages/UpdateUserInfoPage";
import ConfirmDeleteAccountPage from "@/pages/ConfirmDeleteAccountPage";
import CompleteDeleteAccountPage from "@/pages/CompleteDeleteAccountPage";
import UpdateProfilePage from "@/pages/UpdateProfilePage";
import CommentDetailPage from "@/pages/CommentDetailPage";
import RegisterInfoPage from "@/pages/RegisterInfoPage";
import RegisterImagePage from "@/pages/RegisterImagePage";
import RegisterArtworkPage from "@/pages/RegisterArtworkPage";
import RegisterColorPage from "@/pages/RegisterColorPage";
import RegisterCompletePage from "@/pages/RegisterCompletePage";
import CommentEditPage from "@/pages/CommentEditPage";
import CommentMyPage from "@/pages/CommentMyPage";
import CommentLikedPage from "@/pages/CommentLikedPage";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "@/pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <TodayArtsPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <RegisterInfoPage /> },
      { path: "/signup/profile", element: <RegisterImagePage /> },
      { path: "signup/artwork", element: <RegisterArtworkPage /> },
      { path: "signup/color", element: <RegisterColorPage /> },
      { path: "signup/complete", element: <RegisterCompletePage /> },
      { path: "*", element: <NotFoundPage /> },
      {
        element: <ProtectedRoute />,
        children: [
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
          { path: "/artworks/:artworkId", element: <ArtworkPage /> },
          { path: "/comments/write/:artworkId", element: <WritePage /> },

          { path: "/wrapped", element: <WrappedPage /> },

          { path: "/comments/:commentId", element: <CommentDetailPage /> },
          { path: "comments/edit/:commentId", element: <CommentEditPage /> },
          { path: "comments/my", element: <CommentMyPage /> },
          { path: "comments/liked", element: <CommentLikedPage /> },
        ],
      },
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
      { path: "/artworks/:artworkId", element: <ArtworkPage /> },
      { path: "/comments/write/:artworkId", element: <WritePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <RegisterInfoPage /> },
      { path: "/signup/profile", element: <RegisterImagePage /> },
      { path: "signup/artwork", element: <RegisterArtworkPage /> },
      { path: "signup/color", element: <RegisterColorPage /> },
      { path: "signup/complete", element: <RegisterCompletePage /> },
      { path: "/wrapped", element: <WrappedPage /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "/comments/:commentId", element: <CommentDetailPage /> },
      { path: "comments/edit/:commentId", element: <CommentEditPage /> },
      { path: "comments/my", element: <CommentMyPage /> },
      { path: "comments/liked", element: <CommentLikedPage /> },
      { path: "/error", element: <ErrorPage /> },
    ],
  },
]);

export default router;
