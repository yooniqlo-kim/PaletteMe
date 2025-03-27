import Chip from "@/shared/components/buttons/Chip";

type Props = {
  selected: string | null;
  onSelect: (filter: string) => void;
};

const filters = ["연령", "선호작가", "유사취향", "색깔"];

export default function RecommendedFilterChips({ selected, onSelect }: Props) {
  return (
    <div className="flex justify-evenly items-center py-[0.75rem] overflow-x-auto w-full">
      {filters.map((filter) => (
        <Chip
          key={filter}
          text={filter}
          onClick={() => onSelect(filter)}
          className={`
            rounded-[0.5rem] border border-black px-[0.75rem] h-[2rem] text-sm whitespace-nowrap
            ${selected === filter ? 'bg-black text-white' : 'bg-white text-black'}
          `}
        />
      ))}
    </div>
  );
}
