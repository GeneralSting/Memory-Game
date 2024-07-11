import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GameResult, ImageBoardProps, Images } from "../../types";
import { getUrlTime, preloadImages } from "../../utils";
import { GameBoard } from "../../classes";

const ImageBoard: FC<ImageBoardProps> = ({ initialImages, resetGame }) => {
  const [images, setImages] = useState<Images[]>(initialImages);
  const [clickEnabled, setClickEnabled] = useState<boolean>(true);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [gameResult, setGameResult] = useState<GameResult>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const firstFlippedRef = useRef<number | null>(null);
  const pairsFoundRef = useRef<number>(0);
  const imagesRef = useRef(images);

  const gameBoard = useMemo(
    () => new GameBoard(initialImages.length),
    [initialImages.length]
  );

  const updateFirstFlipped = useCallback((value: null | number) => {
    firstFlippedRef.current = value;
  }, []);

  const foundedPairsStatus = useCallback(() => {
    pairsFoundRef.current++;
    if (pairsFoundRef.current === images.length / 2) {
      setGameResult(2);
    }
  }, [images.length]);

  const resetFoundedPairs = useCallback(() => {
    pairsFoundRef.current = 0;
  }, []);

  const showImage = (index: number) => {
    const updatedImages = images.map((image, i) =>
      i === index ? { ...image, show: true } : image
    );
    return updatedImages;
  };

  const hideImages = (firstIndex: number, secondIndex: number): Images[] => {
    const updatedImages = images.map((image, i) =>
      i === firstIndex || i === secondIndex ? { ...image, show: false } : image
    );
    return updatedImages;
  };

  const handleImageClick = (index: number) => {
    setGameResult(1);
    setImages(showImage(index));
    if (firstFlippedRef.current === null) {
      updateFirstFlipped(index);
    } else {
      if (images[firstFlippedRef.current].name !== images[index].name) {
        setClickEnabled(false);
        setTimeout(() => {
          firstFlippedRef.current !== null &&
            setImages(hideImages(firstFlippedRef.current, index));
          updateFirstFlipped(null);
          setClickEnabled(true);
        }, 1000);
      } else {
        foundedPairsStatus();
        updateFirstFlipped(null);
      }
    }
  };

  useEffect(() => {
    setTime(getUrlTime());
    setImages(initialImages);
    setGameResult(0);
    resetFoundedPairs();
    setClickEnabled(true);
  }, [initialImages, resetFoundedPairs]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (gameResult === 1) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          const { minutes, seconds } = prevTime;
          if (minutes === 0 && seconds === 0) {
            clearInterval(timer!);
            alert("Time is up!");
            setClickEnabled(false);
            setGameResult(3);
            return { minutes: 0, seconds: 0 };
          } else if (seconds > 0) {
            return { minutes, seconds: seconds - 1 };
          } else if (seconds === 0 && minutes > 0) {
            return { minutes: minutes - 1, seconds: 59 };
          }
          return prevTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameResult, time]);

  useEffect(() => {
    const imageUrls = imagesRef.current.map((image) => image.url);
    preloadImages(imageUrls)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {gameBoard === null || gameBoard === undefined || loading ? (
        <h1>Loading Images...</h1>
      ) : (
        <div className="container">
          <div
            className="imagesWrapper"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${gameBoard?.getColumns()}, 1fr)`,
              gridTemplateRows: `repeat(${gameBoard?.getRows()}, 1fr)`,
              gap: "10px",
            }}
          >
            {images.map((image, index) =>
              image.show ? (
                <img
                  src={image.url}
                  key={index}
                  alt={`image-${index}`}
                  height="125"
                  width="125"
                />
              ) : (
                <div
                  key={index}
                  className="imagePlaceholder"
                  onClick={(e) =>
                    clickEnabled ? handleImageClick(index) : e.preventDefault()
                  }
                ></div>
              )
            )}
          </div>
          <div className="sidebar">
            <div className="sidebar">
              <div>
                {String(time.minutes).padStart(2, "0")}:
                {String(time.seconds).padStart(2, "0")}
              </div>
              <button onClick={resetGame}>reset game</button>
              {gameResult === 0 && <div>Open first image to start</div>}
              {gameResult === 2 && <div>Win</div>}
              {gameResult === 3 && <div>Time is up!</div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageBoard;
