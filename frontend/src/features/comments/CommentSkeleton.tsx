export function CommentSkeleton() {
  return (
    <div 
      className="relative max-w-[23.75rem] rounded-pm overflow-hidden shadow-md animate-pulse"
      style={{ backgroundColor: "#333" }}
    >
      <div className="relative flex flex-col p-4">
        <div className="absolute inset-0 z-0 bg-neutral-200" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-300" />
            <div className="flex flex-col gap-1">
              <div className="h-4 w-20 bg-neutral-300 rounded" />
              <div className="h-3 w-16 bg-neutral-300 rounded" />
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <div className="h-6 w-8 bg-neutral-300 rounded-full" />
          </div>
        </div>
        
        <div className="relative z-10 mt-3 space-y-2">
          <div className="h-4 w-full bg-neutral-300 rounded mb-1" />
          <div className="h-4 w-full bg-neutral-300 rounded mb-1" />
          <div className="h-4 w-4/5 bg-neutral-300 rounded mb-1" />
          <div className="h-4 w-2/3 bg-neutral-300 rounded" />
        </div>
      </div>
    </div>
  );
} 