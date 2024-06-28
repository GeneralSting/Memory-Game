import MemoryGame from "../components/memoryGame/MemoryGame";
import { shuffleGameImages } from "../utils";

const HardMode = () => {
  const gameImages = shuffleGameImages(17);

  return (
    <>
      <h1>Hard Mode</h1>
      <MemoryGame images={gameImages} />
    </>
  );
};

export default HardMode;
