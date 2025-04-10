import React from "react";

import classNames from "classnames";

import { TIMER } from "./constants";

const TimerType = ({ selectedTimer, setSelectedTimer }) => (
  <div className="mb-4 flex justify-center gap-4">
    {TIMER.map(timer => (
      <div
        key={timer.type}
        className={classNames(
          "cursor-pointer rounded-lg p-1 px-2 text-2xl shadow",
          {
            " border-2 border-gray-500": timer.type === selectedTimer.type,
          }
        )}
        onClick={() => setSelectedTimer(timer)}
      >
        {timer.type}
      </div>
    ))}
  </div>
);

export default TimerType;
