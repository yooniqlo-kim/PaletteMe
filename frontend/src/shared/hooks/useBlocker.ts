import { useEffect } from "react";
import {
  useBlocker as useBlockerCore,
  BlockerFunction,
  useLocation,
  Location,
} from "react-router-dom";

export const useBlocker = (when: boolean | BlockerFunction) => {
  const {
    state,
    location: nextLocation,
    reset,
    proceed,
  } = useBlockerCore(when);

  const currentLocation = useLocation();

  // 브라우저 새로고침, 탭 닫기 차단
  useEffect(() => {
    if (
      (typeof when === "boolean" && when) ||
      (typeof when === "function" &&
        when({
          currentLocation,
          nextLocation: nextLocation as Location,
          historyAction: "PUSH" as never,
        }))
    ) {
      window.onbeforeunload = (e) => {
        e.preventDefault();
        e.returnValue = "";
      };
    } else {
      window.onbeforeunload = null;
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [when, state, currentLocation, nextLocation]);

  return { state, reset, proceed };
};
