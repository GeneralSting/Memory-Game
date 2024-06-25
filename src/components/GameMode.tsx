import { FC } from "react";
import { GameMode as GameModeClass } from "../classes/GameMode";
import TimePicker from "./TimePicker";
import { useNavigate } from "react-router-dom";

type GameModeProps = {
  gameMode: GameModeClass;
  index: number;
  selected: number | null;
  handleClick: (index: number) => void;
};

const GameMode: FC<GameModeProps> = ({
  gameMode,
  index,
  selected,
  handleClick,
}) => {
  const navigate = useNavigate();

  const handleTimeUpdate = (minutes: string, seconds: string) => {
    if (minutes === "0" && seconds === "0") {
      navigate(`${gameMode.getDifficulty()}`);
    } else {
      navigate(
        `/${gameMode.getDifficulty()}?minutes=${minutes}&seconds=${seconds}`
      );
    }
  };

  return (
    <div
      key={index}
      className={`game-item ${gameMode.getBgClass()} ${
        selected === index ? "game-mode-clicked" : ""
      }`}
      onClick={() => handleClick(index)}
    >
      <div className="game-title">{gameMode.getDifficulty()} Mode</div>
      <div className="game-description">{gameMode.getDescription()}</div>
      {selected === index && <TimePicker onTimeUpdate={handleTimeUpdate} />}
    </div>
  );
};

export default GameMode;
