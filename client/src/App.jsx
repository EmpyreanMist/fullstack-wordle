import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Header from "./components/header";
import MusicController from "./components/MusicController";
import GamePage from "./components/GamePage";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<GamePage />} />
        </Routes>
      </main>
      <MusicController />
    </div>
  );
}

export default App;
