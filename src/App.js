import React, { useState } from 'react';
import './App.css';
import Game from './components/Game';
import Popup from './popup';

export default function App() {
  const [winner, setWinner] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleGameEnd = (winner, resetGame) => {
    setWinner(winner);
    setPopupOpen(true);
    //Pass the resetGame callback to the Popup component
    setResetGame(() => resetGame);
  };

  const [resetGame, setResetGame] = useState(() => () => null);

  const handleClosePopup = () => {
    setWinner(null);
    setPopupOpen(false);
    // Call the resetGame callback to reset the game
    resetGame();
  };

  return (
    <div className="App">
      <Game onGameEnd={handleGameEnd} />
      {isPopupOpen && <Popup winner={winner} onClose={handleClosePopup} />}
    </div>
  );
}