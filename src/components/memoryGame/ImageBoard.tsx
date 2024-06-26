import { FC, useState } from "react";
import { ImageType } from "./images";

type ImageBoradProps = {
  initialImages: ImageType[];
};

const ImageBoard: FC<ImageBoradProps> = ({ initialImages }) => {
  const [images, setImages] = useState<ImageType[]>(initialImages);
  const [firstFlipped, setFirstFlipped] = useState<number | null>(null);

  const numberOfImages = images.length;
  const columns = Math.ceil(Math.sqrt(numberOfImages));
  const rows = Math.ceil(numberOfImages / columns);

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

  return (
    <div
      className="imagesWrapper"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: "10px",
      }}
    >
      {images.map((image, index) =>
        image.show ? (
          <img src={image.url} key={index} alt={`image-${index}`} />
        ) : (
          <div
            key={index}
            className="imagePlaceholder"
            onClick={() => handleImageClick(index)}
          ></div>
        )
      )}
    </div>
  );
};

export default ImageBoard;
