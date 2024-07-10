import { GameMode } from "../classes/GameMode";
import { GameDifficulty, GameDifficultyFactor } from "../types";

const gameModeFactory = (modes: GameDifficultyFactor): GameMode[] => {
  return modes.map((data) => modeFactory(data));
};

const modeFactory = (mode: GameDifficulty): GameMode => {
  switch (mode) {
    case "Easy":
      return new GameMode("Easy", "6 pairs", "game-mode-easy");
    case "Mid":
      return new GameMode("Mid", "10 pairs", "game-mode-mid");
    case "Hard":
      return new GameMode("Hard", "17 pairs", "game-mode-hard");
  }
};

export default gameModeFactory;
