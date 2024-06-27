import "./MemoryGame.css";
import { shuffle } from "lodash";
import ImageBoard from "./ImageBoard";
import { FC, useCallback, useEffect, useState } from "react";
import { ImageType } from "./images";

type Props = {
  images: ImageType[];
};

const MemoryGame: FC<Props> = ({ images }) => {
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
