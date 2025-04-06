import modalImg from "@/assets/images/modal.png";
import Button from "../buttons/Button";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";

type ModalProps = {
  open: boolean;
  msg: string;
  confirmMsg: string;
  onClose: () => void;
  route?: string;
  onConfirm?: () => void;
  cancelText?: string;       // 버튼 텍스트 커스터마이징
  confirmText?: string;      // 버튼 텍스트 커스터마이징
};

//  Modal 컴포넌트 사용하는 곳에서 아래와 같이 사용
/*
{isModalOpened && (
    <Modal
    open={isModalOpened}
    msg="지금까지 작성한 감상문이 사라져요"
    confirmMsg="정말 삭제하시겠습니까?"
    onClose={() => setIsModalOpened(false)}
    />
)}
*/
export default function Modal({
  open,
  msg,
  confirmMsg,
  onClose,
  route,
  onConfirm,
  cancelText, 
  confirmText,
}: ModalProps) {
  const dialog = useRef<HTMLDialogElement | null>(null);

  const navigate = useNavigate();

  function handleClick() {
    onClose();
    if (route) navigate(route);
  }

  function handleBackdropClick(event: React.MouseEvent<HTMLDialogElement>) {
    // 클릭된 요소가 dialog 자체인지 확인
    if (event.target === dialog.current) {
      onClose();
    }
  }

  useEffect(() => {
    if (dialog.current) {
      if (open) {
        dialog.current.showModal();
      } else {
        dialog.current.close();
      }
    }
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      onClick={handleBackdropClick} // 모달 바깥 클릭 감지
      onClose={onClose}
      className="rounded-ps bg-white p-[2.7rem] max-w-[320px] w-[40%] h-[45%] flex flex-col m-auto items-center justify-between backdrop:fixed backdrop:top-0 backdrop:max-w-[25.75rem] backdrop:left-0 backdrop:bg-[rgba(34,34,34,0.50)] backdrop-blur-sm backdrop:m-auto backdrop:h-dvh"
    >
      <img
        src={modalImg}
        alt="modal img"
        width={"80px"}
        height={"80px"}
      />
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-medium">{msg}</p>
        <p className="text-sm font-medium">{confirmMsg}</p>
      </div>

      <div className="whitespace-nowrap flex justify-between w-full">
        <Button size="S" onClick={handleClick}>
          {cancelText ?? "아니오"}
        </Button>
        <Button
          size="S"
          onClick={onConfirm ?? handleClick}
          className="whitespace-nowrap bg-white border border-primary !text-primary hover:bg-white"
        >
          {confirmText ?? "네"}
        </Button>
      </div>
    </dialog>,
    document.getElementById("modal")!
  );
}
