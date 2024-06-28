import MemoryGame from "../components/memoryGame/MemoryGame";
import { shuffleGameImages } from "../utils";

const MidMode = () => {
  const gameImages = shuffleGameImages(10);

  return (
    <>
      <h1>Mid Mode</h1>
      <MemoryGame images={gameImages} />
    </>
  );
};

export default MidMode;
