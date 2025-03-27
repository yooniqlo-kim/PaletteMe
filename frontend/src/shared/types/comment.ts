import { BaseUser } from "./user";

export type BaseComment = {
  commentId: string;
  user: BaseUser;
  date: string;
  content: string;
  likeCount: number;
  //artworkId?: string;
};
