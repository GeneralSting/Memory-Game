import { useState } from "react";

const ImageBoard = ({ images }) => {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [foundImages, setFoundImages] = useState({});

  const handleImageClick = (index) => {
    if (images[flippedIndex] === images[index]) {
      // if current and previous images match,
      // make them visible
      setFoundImages({ ...foundImages, [index]: true, [flippedIndex]: true });
    }
    setFlippedIndex(index);
  };

  const isImageVisible = (index) => {
    if (foundImages[index] === true) {
      // if image was "found"
      return true;
    }
    if (index === flippedIndex) {
      // if image was just flipped
      return true;
    }
    return false;
  };

  return (
    <div className="imagesWrapper">
      {images.map((image, index) =>
        isImageVisible(index) ? (
          <img src={image} />
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
