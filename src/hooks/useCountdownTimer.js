import { useEffect, useRef, useState } from "react";

export const useCountdownTimer = (duration, onComplete, audioReference) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning && timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const pause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = (newDuration = duration) => {
    pause();
    setTimeLeft(newDuration);
  };

  useEffect(() => {
    reset(duration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      pause();
      onComplete();
      playAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const toggle = () => (isRunning ? pause() : start());

  const formatTime = seconds => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${mins}:${secs}`;
  };

  const playAudio = () => {
    if (audioReference.current) {
      audioReference.current.play();
    }
  };

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    toggle,
    formattedTime: formatTime(timeLeft),
  };
};
