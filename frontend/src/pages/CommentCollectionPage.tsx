import { useState } from "react";
import { commentDummy } from "@/shared/dummy/commentDummy";
import { artworkDummy } from "@/shared/dummy/artworkDummy";
import { CommentListView } from "@/features/comments/CommentListView";
import { ViewToggleTab } from "@/features/comments/ViewToggleTab";
import { CommentTicketView } from "@/features/comments/CommentTicketView";

export default function CommentCollectionPage() {
  const [view, setView] = useState<"list" | "ticket">("list");

  const artworkMap = {
    a1: artworkDummy, // 실제로는 여러 작품이면 map으로 만들기
  };

  return (
    <div className="min-h-screen pb-28">
      <header className="px-4 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">나의 감상문</h1>
        <ViewToggleTab value={view} onChange={setView} />
      </header>
      {view === "list" ? (
        <CommentListView comments={commentDummy} artworks={artworkMap} />
      ) : (
        <CommentTicketView comments={commentDummy} artworks={artworkMap} />
      )}
    </div>
  );
}
