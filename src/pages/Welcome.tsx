import { useState } from "react";
import GameModeComponent from "../components/GameMode";
import { GameDifficultyFactor } from "../types";
import gameModeFactory from "../utils/gameModeFactory";
import { GameMode } from "../classes";

const availableModes: GameDifficultyFactor = ["Easy", "Mid", "Hard"];
const gameModes: GameMode[] = gameModeFactory(availableModes);

const Welcome = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelected(index);
  };
  return (
    <>
      <h1>Memory Game</h1>
      <h2 className="mb-8">Select difficulty, timer is optional</h2>
      <div className="game-list">
        {gameModes.map((gameMode, index) => (
          <GameModeComponent
            key={index}
            gameMode={gameMode}
            index={index}
            selected={selected}
            handleClick={handleClick}
          />
        ))}
      </div>
    </>
  );
};

export default Welcome;
