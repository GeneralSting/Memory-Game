import "./App.css";
import MemoryGame from "./memoryGame/MemoryGame";
import images from "./images.json";
import { ImageType } from "./memoryGame/images";
import { Route, Routes } from "react-router-dom";
import appRoutes from "./routes/AppRoutes";

function App() {
  const parsedImages: ImageType[] = images as ImageType[];
  return (
    <div className="App">
      <Routes>
        {appRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
