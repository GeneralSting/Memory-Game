import { ImageType } from "../components/memoryGame/images";
import images from "../images.json";
import { shuffle } from "lodash";
import MemoryGame from "../components/memoryGame/MemoryGame";

const MidMode = () => {
  const parsedImages: ImageType[] = images as ImageType[];
  const shuffledArray = shuffle([...parsedImages]);

  const randomSubset = shuffledArray.slice(0, 10);

  return (
    <>
      <h1>Mid Mode</h1>
      <MemoryGame images={randomSubset} />
    </>
  );
};

export default MidMode;
