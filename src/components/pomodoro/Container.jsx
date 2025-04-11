import React, { useRef, useState } from "react";

import { Button } from "neetoui";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";

import { TIMER } from "./constants";
import TimerType from "./TimerType";

import pomodoroAlarm from "../../assets/pomodoroAlarm.mp3";
import { useCountdownTimer } from "../../hooks/useCountdownTimer";

const Container = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedTimer = TIMER[selectedIndex];

  const handleTimerComplete = () => {
    if (selectedIndex === 0) setSelectedIndex(selectedIndex + 1);
    else setSelectedIndex(0);
  };

  const audioReference = useRef(null);

  const { formattedTime, isRunning, start, pause } = useCountdownTimer(
    selectedTimer.time,
    handleTimerComplete,
    audioReference
  );

  return (
    <div className="flex h-full items-center justify-center">
      <section className="rounded-lg border-2 border-gray-400 p-6 shadow-md">
        <TimerType
          selectedTimer={selectedTimer}
          setSelectedTimer={timer => {
            const index = TIMER.findIndex(
              timerObject => timerObject.type === timer.type
            );
            setSelectedIndex(index);
          }}
        />
        <div className="mb-4 text-center text-7xl font-bold text-gray-800">
          {formattedTime}
        </div>
        <div className="flex justify-center gap-6">
          <Button
            className="w-auto rounded px-4 py-2"
            icon={isRunning ? FaPause : FaPlay}
            style="text"
            onClick={isRunning ? pause : start}
          />
          {isRunning && (
            <Button
              icon={FaStop}
              style="text"
              onClick={() => handleTimerComplete()}
            />
          )}
        </div>
      </section>
      <audio preload ref={audioReference} src={pomodoroAlarm} />
    </div>
  );
};

export default Container;
