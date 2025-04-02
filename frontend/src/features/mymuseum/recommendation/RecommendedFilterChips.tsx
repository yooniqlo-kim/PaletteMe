import Chip from "@/shared/components/buttons/Chip";

type Props = {
  selected: string | null;
  onSelect: (filter: string) => void;
};

const filters = ["연령", "선호작가", "유사취향", "색깔"];
const filterMap: Record<string, string> = {
  연령: "age",
  선호작가: "favorite_artist",
  유사취향: "similar_taste",
  색깔: "color",
};

export default function RecommendedFilterChips({ selected, onSelect }: Props) {
  return (
    <div className="flex justify-evenly items-center py-[0.75rem] overflow-x-auto w-full">
      {filters.map((filter) => (
        <Chip
          key={filter}
          text={filter}
          onClick={() => onSelect(filterMap[filter])}
          className={`
            rounded-[0.5rem] px-[0.75rem] h-[2rem] text-sm whitespace-nowrap
            ${selected === filterMap[filter]
              ? 'bg-black text-white border-black'
              : 'bg-white text-black border-[var(--color-neutral-3)]'}
          `}
        />
      ))}
    </div>
  );
}
