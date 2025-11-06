import { useEffect, useState } from "react";

export const useCountdown = (timestamp: string) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);

  const startCountdown = () => {
    const targetDate = new Date(timestamp);

    const tick = () => {
      const now = new Date();
      const msDifference = targetDate.getTime() - now.getTime();

      if (msDifference <= 0) {
        clearInterval(intervalId);
        setTimeLeft("00:00");
        setIsActive(false);
        return;
      }

      const totalSeconds = Math.floor(msDifference / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');

      setTimeLeft(`${formattedMinutes}:${formattedSeconds}`);
    }

    const intervalId = setInterval(tick, 1000);
    tick();

    return () => {
      clearInterval(intervalId);
    }
  }

  useEffect(() => {
    if (!timestamp) {
      setTimeLeft("00:00");
      return;
    }

    const stopTimer = startCountdown();

    return stopTimer;
  }, [timestamp]);

  return { timeLeft, isActive };
}