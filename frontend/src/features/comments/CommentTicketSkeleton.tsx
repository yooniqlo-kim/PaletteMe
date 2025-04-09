import IconLeftArrow from "@/shared/components/icons/IconLeftArrow";
import IconRightArrow from "@/shared/components/icons/IconRightArrow";

export function CommentTicketSkeleton() {
  return (
    <div className="relative flex flex-col items-center w-full">
      <button
        className="absolute z-10 transition-transform duration-200 -translate-y-1/2 cursor-pointer left-3 top-1/2 opacity-30"
        disabled
      >
        <IconLeftArrow />
      </button>

      <div className="w-full max-w-[17rem] h-[35rem] rounded-pm bg-white overflow-hidden flex flex-col shadow-md animate-pulse">
        <div className="relative h-[18rem] bg-neutral-300">
          <div className="absolute flex items-center gap-1 px-2 py-1 bottom-2 right-2">
            <div className="h-6 w-8 bg-neutral-400 rounded-full" />
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-2/3 bg-neutral-300 rounded" />
            <div className="h-3 w-1/2 bg-neutral-300 rounded" />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-neutral-300" />
            <div className="flex flex-col gap-1">
              <div className="h-3 w-16 bg-neutral-300 rounded" />
              <div className="h-2 w-12 bg-neutral-300 rounded" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-3 w-full bg-neutral-300 rounded" />
            <div className="h-3 w-full bg-neutral-300 rounded" />
            <div className="h-3 w-full bg-neutral-300 rounded" />
            <div className="h-3 w-4/5 bg-neutral-300 rounded" />
            <div className="h-3 w-3/4 bg-neutral-300 rounded" />
            <div className="h-3 w-1/2 bg-neutral-300 rounded" />
          </div>
        </div>
      </div>

      <button
        className="absolute z-10 transition-transform duration-200 -translate-y-1/2 cursor-pointer right-3 top-1/2 opacity-30"
        disabled
      >
        <IconRightArrow />
      </button>
    </div>
  );
} 