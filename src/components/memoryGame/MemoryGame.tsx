import "./MemoryGame.css";
import { shuffle } from "lodash";
import ImageBoard from "./ImageBoard";
import { FC, useCallback, useMemo, useState } from "react";
import { Images } from "../../types";

type MemoryGameProps = {
  images: Images[];
};

const MemoryGame: FC<MemoryGameProps> = ({ images }) => {
  const [shuffledImages, setShuffledImages] = useState<Images[]>([]);

  const shuffleImages = useCallback(() => {
    const gameImages = shuffle([...images, ...images]);
    setShuffledImages(gameImages);
  }, [images]);

  useMemo(() => {
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
