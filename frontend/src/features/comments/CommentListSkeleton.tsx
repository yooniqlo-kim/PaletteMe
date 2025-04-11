import { CommentSkeleton } from "./CommentSkeleton";

export function CommentListSkeleton() {
  return (
    <div className="flex flex-col items-center w-full gap-4 px-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="w-full max-w-screen-md">
          <CommentSkeleton />
        </div>
      ))}
    </div>
  );
} 