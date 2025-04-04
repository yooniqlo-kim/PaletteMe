import { BaseUser } from "./user";

export type BaseComment = {
  commentId: string;
  artworkId: string;
  user: BaseUser;
  date: string;
  content: string;
  likeCount: number;
  isLiked: boolean;
  visibility?: "public" | "private";
};
