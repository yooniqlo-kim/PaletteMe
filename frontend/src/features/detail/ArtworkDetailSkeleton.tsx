import { WhiteContainer } from "@/shared/components/textbox/WhiteRoundedContainer";
export function ArtworkDetailSkeleton() {
    return (
      <div className="bg-neutral-100 min-h-screen animate-pulse">
        {/* 이미지 + 아이콘 + 메타 정보 */}
        <div className="bg-neutral-200 pt-2">
          <div className="w-full h-[400px] bg-neutral-300" />
        </div>
  
        <div className="flex flex-col gap-2">
          <WhiteContainer withTopRound withMarginTop>
            <div className="flex justify-between items-center mb-2">
              <div className="h-6 w-20 bg-neutral-300 rounded" />
              <div className="flex gap-2">
                <div className="h-6 w-10 bg-neutral-300 rounded" />
                <div className="h-6 w-10 bg-neutral-300 rounded" />
              </div>
            </div>
            <div className="h-5 w-3/4 bg-neutral-300 rounded mb-2" />
            <div className="h-5 w-1/2 bg-neutral-300 rounded mb-2" />
            <div className="h-4 w-full bg-neutral-200 rounded" />
          </WhiteContainer>
  
          <WhiteContainer>
            <div className="h-4 w-24 bg-neutral-300 rounded mb-2" />
            <div className="h-5 w-full bg-neutral-300 rounded mb-1" />
            <div className="h-5 w-4/5 bg-neutral-300 rounded mb-1" />
            <div className="h-5 w-3/5 bg-neutral-300 rounded mb-1" />
          </WhiteContainer>
  
          <WhiteContainer>
            <div className="h-4 w-24 bg-neutral-300 rounded mb-3" />
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="bg-neutral-200 p-4 rounded mb-2 w-full h-[80px]"
              />
            ))}
          </WhiteContainer>
        </div>
      </div>
    );
  }
  