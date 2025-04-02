import { toast, ToastOptions } from "react-toastify";

type ToastType = "success" | "error" | "info" | "warning";

type ShowToastProps = {
  message: string;
  type?: ToastType;
  options?: ToastOptions;
};

export default function useToast() {
  function showToast({ message, type = "info", options = {} }: ShowToastProps) {
    toast[type](message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      ...options,
    });
  }
  return { showToast };
}
