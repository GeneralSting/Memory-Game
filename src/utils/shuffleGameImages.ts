import { ImageType } from "../components/memoryGame/images";
import images from "../images.json";
import { shuffle } from "lodash";

const shuffleGameImages = (imagePairs: number) => {
  const parsedImages: ImageType[] = images as ImageType[];
  const shuffledArray = shuffle([...parsedImages]);

  const randomSubset = shuffledArray.slice(0, imagePairs);
  return randomSubset;
};

export default shuffleGameImages;
