import { useState, useRef } from "react";

export const useTimer = () => {
  const [ms, setMs] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const time = useRef(0);
  const timerId = useRef(null);

  const timerStart = () => {
    timerId.current = setInterval(() => {
      time.current += 0.01;
      setMs((time.current % 1).toFixed(2) * 100);
      setSec(parseInt(time.current / 1));
      setMin(parseInt(time.current / 60));
    }, 10);
  };

  const timerStop = () => {
    clearInterval(timerId.current);
  };

  return {
    ms,
    sec,
    min,
    time,
    timerStart,
    timerStop,
  };
};
