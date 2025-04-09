import RoundedButton from "@/shared/components/buttons/RoundedButton";
import IconPen from "@/shared/components/icons/IconPen";
import { AlignJustify } from "lucide-react";

type FloatingButtonProps = {
  hasWrittenComment: string | null;
  onClick: () => void;
};

export default function FloatingButton({
  hasWrittenComment,
  onClick,
}: FloatingButtonProps) {
  return (
    <div className="fixed bottom-[72px] left-1/2 translate-x-[140px] z-50">
      <RoundedButton identifier="artwork" onClick={onClick}>
        {hasWrittenComment ? (
          <AlignJustify className="text-white" />
        ) : (
          <IconPen />
        )}
      </RoundedButton>
    </div>
  );
}
