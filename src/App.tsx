import "./App.css";
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes";

function App() {
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
