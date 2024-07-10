import { useMemo } from "react";
import MemoryGame from "../components/memoryGame/MemoryGame";
import { shuffleGameImages } from "../utils";

const EasyMode = () => {
  const gameImages = useMemo(() => shuffleGameImages(6), []);

  return (
    <>
      <h1>Easy Mode</h1>
      <MemoryGame images={gameImages} />
    </>
  );
};

export default EasyMode;
