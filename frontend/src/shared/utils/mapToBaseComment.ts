import {
  ReviewSummaryResponse,
  ReviewsWithArtworkResponse,
  ReviewWriteResponse,
  LikedOtherReviewsResponse,
  MyReviewsResponse,
} from "../types/api/comment.response";
import { BaseComment } from "@/shared/types/comment";
import { formatDate } from "./date";
import { ArtworkPreview } from "../types/artwork";

export const mapToBaseComment = (
  res: ReviewSummaryResponse,
  artworkId: string
): BaseComment => ({
  commentId: String(res.reviewId),
  artworkId,
  content: res.content ?? "",
  date: formatDate(res.createdAt ?? ""),
  likeCount: res.reviewLike ?? 0,
  isLiked: res.isLiked ?? false,
  user: {
    nickname: res.nickname ?? "",
    profileImageUrl: res.userImg ?? "",
  },
  visibility: res.isPublic ? "public" : "private",
});

export const mapToCommentAndArtwork = (
  res: ReviewsWithArtworkResponse,
  commentIdFromParam: string
): { comment: BaseComment; artwork: ArtworkPreview } => {
  return {
    comment: {
      commentId: commentIdFromParam,
      artworkId: res.artworkId ?? "",
      content: res.content ?? "",
      date: formatDate(res.createdAt ?? ""),
      likeCount: res.reviewLike ?? 0,
      isLiked: res.isLiked ?? false,
      visibility: res.isPublic ? "public" : "private",
      user: {
        nickname: res.nickname ?? "",
        profileImageUrl: res.userImg ?? "",
      },
    },
    artwork: {
      artworkId: res.artworkId ?? "",
      title: res.title ?? "",
      artist: res.artist ?? "",
      artworkImageUrl: res.imgUrl ?? "",
      location: res.museumName ?? "",
    },
  };
};

export const mapToBaseCommentFromWriteResponse = (
  res: ReviewWriteResponse,
  artworkId: string
): BaseComment => {
  const rawUser = sessionStorage.getItem("user");
  const parsedUser = rawUser ? JSON.parse(rawUser) : null;

  return {
    commentId: String(res.reviewId),
    artworkId,
    content: res.content ?? "",
    date: formatDate(res.createdAt ?? ""),
    likeCount: res.reviewLike ?? 0,
    isLiked: res.liked ?? false,
    visibility: "public",
    user: {
      nickname: parsedUser?.nickname ?? "익명",
      profileImageUrl: parsedUser?.s3Url ?? "",
    },
  };
};

// 좋아요한 감상문 리스트용
export const mapToCommentAndArtworkList = (
  res: LikedOtherReviewsResponse[]
): {
  comments: BaseComment[];
  artworks: Record<string, ArtworkPreview>;
} => {
  const comments: BaseComment[] = [];
  const artworksMap: Record<string, ArtworkPreview> = {};

  for (const item of res) {
    if (!item.artworkId || !item.reviewId) continue;

    const comment: BaseComment = {
      commentId: String(item.reviewId),
      artworkId: item.artworkId,
      content: item.content ?? "",
      date: formatDate(item.createdAt ?? ""),
      likeCount: item.likeCnt ?? 0,
      isLiked: true,
      user: {
        nickname: item.nickname ?? "",
        profileImageUrl: item.userImgUrl ?? "",
      },
      visibility: "public",
    };

    const artwork: ArtworkPreview = {
      artworkId: item.artworkId,
      title: item.title ?? "",
      artist: item.artist ?? "",
      artworkImageUrl: item.artworkImageUrl ?? "",
    };

    comments.push(comment);
    artworksMap[item.artworkId] = artwork;
  }

  return { comments, artworks: artworksMap };
};

//나의 감상문 리스트용
export const mapToMyCommentsAndArtworks = (
  res: MyReviewsResponse[]
): {
  comments: BaseComment[];
  artworks: Record<string, ArtworkPreview>;
} => {
  const rawUser = sessionStorage.getItem("user");
  const parsedUser = rawUser ? JSON.parse(rawUser) : null;

  const comments: BaseComment[] = [];
  const artworksMap: Record<string, ArtworkPreview> = {};

  for (const item of res) {
    if (!item.artworkId || !item.reviewId) continue;

    const comment: BaseComment = {
      commentId: String(item.reviewId),
      artworkId: item.artworkId,
      content: item.content ?? "",
      date: formatDate(item.createdAt ?? ""),
      likeCount: item.likeCnt ?? 0,
      isLiked: item.isLiked ?? false,
      user: {
        nickname: parsedUser?.nickname ?? "",
        profileImageUrl: parsedUser?.s3Url ?? "",
      },
      visibility: item.isPublic ? "public" : "private",
    };

    const artwork: ArtworkPreview = {
      artworkId: item.artworkId,
      title: item.originalTitle ?? "",
      artist: item.originalArtist ?? "",
      artworkImageUrl: item.imageUrl ?? "",
    };

    comments.push(comment);
    artworksMap[item.artworkId] = artwork;
  }

  return { comments, artworks: artworksMap };
};
