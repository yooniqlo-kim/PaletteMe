export default function UserMetaSkeleton() {
  return (
    <article className="py-[1.38rem] px-[2.88rem] flex box-border justify-between bg-neutral-1 border border-white text-sm font-medium rounded-ps cursor-pointer">
      <span className="flex flex-col gap-5 justify-center items-center">
        <div className="h-4 w-12 bg-neutral-2 rounded-md animate-pulse" />
        <div className="h-5 w-8 bg-neutral-2 rounded-md animate-pulse" />
      </span>

      <span className="flex justify-center items-center text-white bg-white w-0.5">
        |
      </span>

      <span className="flex flex-col gap-5 justify-center items-center">
        <div className="h-4 w-12 bg-neutral-2 rounded-md animate-pulse" />
        <div className="h-5 w-8 bg-neutral-2 rounded-md animate-pulse" />
      </span>

      <span className="flex justify-center items-center text-white bg-white w-0.5">
        |
      </span>

      <span className="flex flex-col gap-5 justify-center items-center">
        <div className="h-4 w-12 bg-neutral-2 rounded-md animate-pulse" />
        <div className="h-5 w-8 bg-neutral-2 rounded-md animate-pulse" />
      </span>
    </article>
  );
}
