import { useState } from "react";
import { BaseComment } from "@/shared/types/comment";
import { ViewToggleTab } from "./ViewToggleTab";
import { CommentListView } from "./CommentListView";
import { CommentTicketView } from "./CommentTicketView";
import { BaseArtwork } from "@/shared/types/artwork";

type Props = {
  comments: BaseComment[];
  artworks: Record<string, BaseArtwork>;
  title: string;
};

export function CommentCollectionLayout({ comments, artworks, title }: Props) {
  const [view, setView] = useState<"list" | "ticket">("list");

  return (
    <div className="min-h-screen pb-28">
      <header className="px-4 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">{title}</h1>
        <ViewToggleTab value={view} onChange={setView} />
      </header>

      {view === "list" ? (
        <CommentListView comments={comments} artworks={artworks} />
      ) : (
        <CommentTicketView comments={comments} artworks={artworks} />
      )}
    </div>
  );
}
