import { AppDispatch, RootState } from "@/store/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

type DispatchFunction = () => AppDispatch;

// useSelector와 useDispatch의 타입을 지정
export const useFormDispatch: DispatchFunction = useDispatch;
export const useFormSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useUserDispatch: DispatchFunction = useDispatch;
export const useUserSelector: TypedUseSelectorHook<RootState> = useSelector;
