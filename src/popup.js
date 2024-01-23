import React from 'react';

const Popup = ({ winner, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{winner ? `${winner} wins!` : "It's a draw!"}</h2>
        <button onClick={onClose}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
