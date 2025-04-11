export default function UserProfileSkeleton() {
  return (
    <article className="flex justify-between items-center w-full">
      <span className="flex flex-col gap-8">
        <div className="w-24 h-5 bg-neutral-2 rounded-md animate-pulse" />

        <div className="flex items-center gap-2">
          <div className="w-36 h-4 bg-neutral-2 rounded-md animate-pulse" />
          <div className="w-6 h-6 bg-neutral-2 rounded-full animate-pulse" />
        </div>
      </span>

      <span className="relative">
        <div className="w-20 h-20 bg-neutral-2 rounded-full animate-pulse" />
        <span className="absolute bottom-0 right-0">
          <div className="w-6 h-6 bg-neutral-3 rounded-full animate-pulse" />
        </span>
      </span>
    </article>
  );
}
