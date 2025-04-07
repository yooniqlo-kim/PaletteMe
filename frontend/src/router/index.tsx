import { createBrowserRouter } from "react-router";
import RootLayout from "@/shared/components/layout/RootLayout";
import TodayArtsPage from "@/pages/artwork/TodayArtsPage";
import SearchPage from "@/pages/search/SearchPage";
import MymuseumPage from "@/pages/mymuseum/MymuseumPage";
import LikedCollectionPage from "@/pages/mymuseum/LikedCollectionPage";
import BookmarkCollectionPage from "@/pages/mymuseum/BookmarkCollectionPage";
import CalenderPage from "@/pages/mymuseum/CalendarPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import LoginPage from "@/pages/login/LoginPage";
import WrappedPage from "@/pages/mymuseum/WrappedPage";
import ArtworkPage from "@/pages/artwork/ArtworkPage";
import NotFoundPage from "@/pages/error/NotFoundPage";
import WritePage from "@/pages/comment/CommentWritePage";
import LevelInfoPage from "@/pages/profile/LevelInfoPage";
import ConfirmPasswordPage from "@/pages/profile/ConfirmPasswordPage";
import UpdateUserInfoPage from "@/pages/profile/UpdateUserInfoPage";
import ConfirmDeleteAccountPage from "@/pages/profile/ConfirmDeleteAccountPage";
import CompleteDeleteAccountPage from "@/pages/profile/CompleteDeleteAccountPage";
import UpdateProfilePage from "@/pages/profile/UpdateProfilePage";
import CommentDetailPage from "@/pages/comment/CommentDetailPage";
import RegisterInfoPage from "@/pages/register/RegisterInfoPage";
import RegisterImagePage from "@/pages/register/RegisterImagePage";
import RegisterArtworkPage from "@/pages/register/RegisterArtworkPage";
import RegisterColorPage from "@/pages/register/RegisterColorPage";
import RegisterCompletePage from "@/pages/register/RegisterCompletePage";
import CommentEditPage from "@/pages/comment/CommentEditPage";
import CommentMyPage from "@/pages/comment/CommentMyPage";
import CommentLikedPage from "@/pages/comment/CommentLikedPage";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "@/pages/error/ErrorPage";

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
          { path: "comments/:commentId/edit", element: <CommentEditPage /> },
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
