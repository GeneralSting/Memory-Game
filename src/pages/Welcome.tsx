import { useState } from "react";
import { GameMode } from "../classes/GameMode";
import GameModeComponent from "../components/GameMode";

const Welcome = () => {
  const gameModes: GameMode[] = [
    new GameMode("Easy", "6 pairs", "game-mode-easy"),
    new GameMode("Mid", "10 pairs", "game-mode-mid"),
    new GameMode("Hard", "17 pairs", "game-mode-hard"),
  ];

  const [selected, setSelected] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelected(index);
  };
  return (
    <>
      <h1>Memory Game</h1>
      <h2 className="mb-8">Select difficult, timer is optional</h2>
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
