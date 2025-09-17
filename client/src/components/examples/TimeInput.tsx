import { useState } from 'react';
import TimeInput from '../TimeInput';

export default function TimeInputExample() {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(30);

  return (
    <div className="p-8 bg-background max-w-md mx-auto">
      <TimeInput
        minutes={minutes}
        seconds={seconds}
        onMinutesChange={setMinutes}
        onSecondsChange={setSeconds}
      />
    </div>
  );
}