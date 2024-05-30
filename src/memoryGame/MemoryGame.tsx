import "./MemoryGame.css";
import { shuffle } from "lodash";
import ImageBoard from "./ImageBoard";

const MemoryGame = ({ images }) => {
  // given 6 images, generate 12 cards for the game
  const gameImages = shuffle([...images, ...images]);
  return <ImageBoard images={gameImages} />;
};

export default MemoryGame;
