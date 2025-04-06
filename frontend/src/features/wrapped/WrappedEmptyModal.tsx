import Modal from "@/shared/components/modal/Modal";
import { WrappedDummy } from "@/shared/dummy/wrappedDummy";
import type { WrappedData } from "@/shared/api/wrapped";

type Props = {
  open: boolean;
  onClose: () => void;
  onUseSample: (sample: WrappedData) => void;
};

export default function WrappedEmptyModal({ open, onClose, onUseSample }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      onConfirm={() => onUseSample(WrappedDummy)}
      msg="Wrapped 데이터가 없어요!"
      confirmMsg="예시를 확인볼까요?"
      confirmText="예시 보기"
      cancelText="닫기"
    />
  );
}
