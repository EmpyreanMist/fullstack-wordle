import './App.css';
import Header from './header.jsx';
import BackgroundMusic from './BackgroundMusic.jsx';

function App() {
  return (
    <div className="app">
      <BackgroundMusic />
      <Header />
      <main>
        <p>Test paragraph!</p>
      </main>
    </div>
  );
}

export default App;
