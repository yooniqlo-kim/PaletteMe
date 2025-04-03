import { api } from "./core";
import { mapToBaseComment } from "../utils/mapToBaseComment";
import { BaseComment } from "@/shared/types/comment";
import { CommentSummaryResponse } from "../types/api/comment.response";

export const getComments = async ({
  artworkId,
  cursor,
  size = 5,
}: {
  artworkId: string;
  cursor?: number;
  size?: number;
}): Promise<BaseComment[]> => {
  const res = await api.get("/reviews", {
    params: {
      artworkId,
      cursor,
      size,
    },
  });

  const { success, data, errorMsg } = res.data;
  if (!success || !data) throw new Error(errorMsg ?? "감상문 조회 실패");

  const reviews: CommentSummaryResponse[] = data.reviews ?? [];

  return reviews
    .filter((r): r is CommentSummaryResponse => r !== null && r !== undefined)
    .map((r: CommentSummaryResponse) => mapToBaseComment(r, artworkId));
};
