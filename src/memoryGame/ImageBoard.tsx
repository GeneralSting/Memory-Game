import { FC, useState } from "react";
import { ImageType } from "./images";

type Props = {
  initialImages: ImageType[];
};
const ImageBoard: FC<Props> = ({ initialImages }) => {
  const [images, setImages] = useState<ImageType[]>(initialImages);
  const [firstFlipped, setFirstFlipped] = useState<number | null>(null);

  const showImage = (index: number) => {
    const updatedImages: ImageType[] = images.map((image, i) => {
      if (i === index) {
        return { ...image, show: true };
      }
      return image;
    });
    return updatedImages;
  };

  const hideImages = (firstIndex: number, secondIndex: number) => {
    const updatedImages: ImageType[] = images.map((image, i) => {
      if (i === firstIndex || i === secondIndex) {
        return { ...image, show: false };
      }
      return image;
    });
    return updatedImages;
  };

  const handleImageClick = (index: number) => {
    setImages(showImage(index));
    if (firstFlipped === null) {
      setFirstFlipped(index);
    } else {
      if (images[firstFlipped].name !== images[index].name) {
        setTimeout(() => {
          setImages(hideImages(firstFlipped, index));
        }, 1000);
      }
      setFirstFlipped(null);
    }
  };

  // const isImageVisible = (index: number) => {
  //   if (foundImages[index] === true) {
  //     // if image was "found"
  //     return true;
  //   }

  //   if (index === firstFlipped || secondFlipped) {
  //     // if image was just flipped
  //     return true;
  //   }
  //   return false;
  // };

  return (
    <div className="imagesWrapper">
      {images.map((image, index) =>
        image.show ? (
          <img src={image.url} />
        ) : (
          <div
            className="imagePlaceholder"
            onClick={() => handleImageClick(index)}
          ></div>
        )
      )}
    </div>
  );
};

export default ImageBoard;
