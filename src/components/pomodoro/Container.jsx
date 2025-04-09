import React, { useState } from "react";

import { Button } from "neetoui";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";

import { TIMER } from "./constants";
import TimerType from "./TimerType";

const Container = () => {
  const [selectedTimer, setSelectedTimer] = useState(TIMER[0]);
  const [isTimerStart, setIsTimerStart] = useState(false);

  return (
    <div className="flex h-full items-center justify-center">
      <section className="rounded-lg border-2 border-gray-400  p-6">
        <TimerType {...{ selectedTimer, setSelectedTimer }} />
        <div className="mb-4 text-center text-7xl font-bold text-gray-800">
          {selectedTimer.time}
        </div>
        <div className="flex justify-center gap-6">
          <Button
            className="w-auto rounded px-4 py-2 "
            icon={isTimerStart ? FaPause : FaPlay}
            style="text"
            onClick={() => setIsTimerStart(!isTimerStart)}
          />
          {isTimerStart && (
            <Button
              icon={FaStop}
              style="text"
              onClick={() => setIsTimerStart(false)}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Container;
