import "./MemoryGame.css";
import { shuffle } from "lodash";
import ImageBoard from "./ImageBoard";
import { FC, useCallback, useEffect, useState } from "react";
import { ImageType } from "./images";

type MemoryGameProps = {
  images: ImageType[];
};

const MemoryGame: FC<MemoryGameProps> = ({ images }) => {
  const [shuffledImages, setShuffledImages] = useState<ImageType[]>([]);

  const shuffleImages = useCallback(() => {
    const gameImages = shuffle([...images, ...images]);
    setShuffledImages(gameImages);
  }, [images]);

  useEffect(() => {
    shuffleImages();
  }, [shuffleImages]);

  return (
    <>
      {shuffledImages.length !== 0 && (
        <ImageBoard initialImages={shuffledImages} resetGame={shuffleImages} />
      )}
    </>
  );
};

export default MemoryGame;
