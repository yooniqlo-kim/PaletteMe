import { BaseComment } from "@/shared/types/comment";
import { ViewToggleTab } from "./ViewToggleTab";
import { CommentListView } from "./CommentListView";
import { CommentTicketView } from "./CommentTicketView";
import { BaseArtwork } from "@/shared/types/artwork";
import { CommentListSkeleton } from "./CommentListSkeleton";
import { CommentTicketSkeleton } from "./CommentTicketSkeleton";

type Props = {
  comments: BaseComment[];
  artworks: Record<string, BaseArtwork>;
  title: string;
  view: "list" | "ticket";
  onViewChange: (view: "list" | "ticket") => void;
  onLikeChange?: (commentId: string, isLiked: boolean) => void;
  onLoadMore?: () => void;
  isLoading?: boolean;
};

export function CommentCollectionLayout({
  comments,
  artworks,
  title,
  view,
  onViewChange,
  onLikeChange,
  onLoadMore,
  isLoading = false,
}: Props) {
  return (
    <div className="min-h-screen pb-4">
      <header className="flex items-center justify-between px-4 py-4">
        <h1 className="px-3 text-lg font-bold">{title}</h1>
        <ViewToggleTab value={view} onChange={onViewChange} />
      </header>

      {isLoading ? (
        view === "list" ? (
          <CommentListSkeleton />
        ) : (
          <CommentTicketSkeleton />
        )
      ) : view === "list" ? (
        <CommentListView
          comments={comments}
          artworks={artworks}
          onLikeChange={onLikeChange}
        />
      ) : (
        <CommentTicketView
          comments={comments}
          artworks={artworks}
          onLikeChange={onLikeChange}
          onLoadMore={onLoadMore}
        />
      )}
    </div>
  );
}
