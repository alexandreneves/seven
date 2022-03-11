import { useState } from "react";
import { useInterval } from "./useInterval";

export const useForceRender = (delay: number): number => {
  const [counter, setCounter] = useState(0);

  useInterval(() => {
    setCounter(counter + 1);
  }, delay);

  return counter;
};
