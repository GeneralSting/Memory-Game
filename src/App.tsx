import "./App.css";
import MemoryGame from "./memoryGame/MemoryGame";
import images from "./images.json";
import { ImageType } from "./memoryGame/images";

function App() {
  const parsedImages: ImageType[] = images as ImageType[];
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <MemoryGame
        images={parsedImages}
      />
    </div>
  );
}

export default App;
