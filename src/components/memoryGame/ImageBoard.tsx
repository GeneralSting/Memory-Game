import { FC, useCallback, useEffect, useState } from "react";
import { ImageType } from "./images";
import { useLocation } from "react-router-dom";

type ImageBoardProps = {
  initialImages: ImageType[];
  resetGame: () => void;
};

type GameResult = 0 | 1 | 2 | 3;

const ImageBoard: FC<ImageBoardProps> = ({ initialImages, resetGame }) => {
  const [images, setImages] = useState<ImageType[]>(initialImages);
  const [firstFlipped, setFirstFlipped] = useState<number | null>(null);
  const [clickEnabled, setClickEnabled] = useState<boolean>(true);
  const [pairsFound, setPairsFound] = useState<number>(0);
  const [gameResult, setGameResult] = useState<GameResult>(0);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const location = useLocation(); // Get the location object

  const getTime = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const minutesParam = searchParams.get("minutes");
    const secondsParam = searchParams.get("seconds");
    const minutes = minutesParam !== null ? parseInt(minutesParam, 10) : 0;
    const seconds = secondsParam !== null ? parseInt(secondsParam, 10) : 0;

    if (minutes !== 0 || seconds !== 0) {
      setTime({ minutes, seconds });
    }
  }, [location.search]);

  useEffect(() => {
    getTime();
  }, [getTime]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          const { minutes, seconds } = prevTime;
          console.log(seconds);
          if (minutes === 0 && seconds === 0) {
            clearInterval(timer!);
            alert("Time is up!");
            setIsRunning(false);
            setClickEnabled(false);
            setGameResult(3);
            return { minutes: 0, seconds: 0 };
          } else if (seconds > 0) {
            return { minutes, seconds: seconds - 1 };
          } else if (seconds === 0 && minutes > 0) {
            return { minutes: minutes - 1, seconds: 59 };
          }
          // Ensure a default return value
          return prevTime; // Return previous state if none of the conditions match
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

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
    if (!isRunning) {
      if (time.minutes !== 0 || time.seconds !== 0) {
        setIsRunning(true);
      }
      setGameResult(1);
    }
    setImages(showImage(index));
    if (firstFlipped === null) {
      setFirstFlipped(index);
    } else {
      if (images[firstFlipped].name !== images[index].name) {
        setClickEnabled(false);
        setTimeout(() => {
          setImages(hideImages(firstFlipped, index));
          setClickEnabled(true);
        }, 1000);
      } else {
        setPairsFound(pairsFound + 1);
      }
      setFirstFlipped(null);
    }
  };

  useEffect(() => {
    if (pairsFound === images.length / 2) {
      setGameResult(2);
      setIsRunning(false);
    }
  }, [images.length, pairsFound]);

  useEffect(() => {
    setImages(initialImages);
    setFirstFlipped(null);
    setGameResult(0);
    setIsRunning(false);
    setPairsFound(0);
    getTime();
    setClickEnabled(true);
  }, [getTime, initialImages]);

  return (
    <div className="container">
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
              onClick={(e) =>
                clickEnabled ? handleImageClick(index) : e.preventDefault()
              }
            ></div>
          )
        )}
      </div>
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
  );
};

export default ImageBoard;
