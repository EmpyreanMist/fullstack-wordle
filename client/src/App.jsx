import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Header from "./components/header";
import MusicController from "./components/MusicController";
import GamePage from "./components/GamePage";
import InfoPage from "./components/InfoPage";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<GamePage />} />
          <Route path="/info" element={<InfoPage />} />
        </Routes>
      </main>
      <MusicController />
    </div>
  );
}

export default App;
