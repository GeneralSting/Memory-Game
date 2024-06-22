import "./MemoryGame.css";
import { shuffle } from "lodash";
import ImageBoard from "./ImageBoard";
import { FC } from "react";
import { ImageType } from "./images";


type Props = {
  images: ImageType[];
};
const MemoryGame: FC<Props> = ({images}) => {
  // given 6 images, generate 12 cards for the game
  const gameImages = shuffle([...images, ...images]);
  return <ImageBoard initialImages={gameImages} />;
};

export default MemoryGame;
