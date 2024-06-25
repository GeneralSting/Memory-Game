import { ChangeEvent, FC, useState } from "react";

type TimePickerProps = {
  onTimeUpdate: (minutes: string, seconds: string) => void;
};

const TimePicker: FC<TimePickerProps> = ({ onTimeUpdate }) => {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      /^\d{0,2}$/.test(value) &&
      (value === "" || (parseInt(value, 10) >= 0 && parseInt(value, 10) < 60))
    ) {
      setMinutes(value);
    }
  };

  const handleSecondsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      /^\d{0,2}$/.test(value) &&
      (value === "" || (parseInt(value, 10) >= 0 && parseInt(value, 10) < 60))
    ) {
      setSeconds(value);
    }
  };

  const handleStart = () => {
    onTimeUpdate(minutes || "0", seconds || "0");
  };

  return (
    <div className="start-section">
      <div className="time-inputs">
        <label>
          Minutes:
          <input
            type="number"
            name="minutes"
            placeholder="MM"
            value={minutes}
            onChange={handleMinutesChange}
            min="0"
            max="59"
          />
        </label>
        <label>
          Seconds:
          <input
            type="number"
            name="seconds"
            placeholder="SS"
            value={seconds}
            onChange={handleSecondsChange}
            min="0"
            max="59"
          />
        </label>
      </div>
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default TimePicker;
