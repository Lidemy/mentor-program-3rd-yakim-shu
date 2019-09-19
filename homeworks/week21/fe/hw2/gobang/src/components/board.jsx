import React from "react";

const Square = ({ onClick, value, size }) => {
  const style = {
    width: size + 'px',
    height: size + 'px',
    lineHeight: size + 'px',
  }
  const clicked = value ? 'clicked' : '';
  const type = value === 'X' ? 'black' : 'white';
  return (
    <button
      className={`square ${clicked} ${value && type}`}
      style={style}
      onClick={onClick}
    >
    </button>
  );
}

const Board = ({ squares, rowSize, rowNum, onClick, blackIsNext }) => {
  return (
    <div className={`board-row ${blackIsNext ? 'black' : 'white'}`}
      style={{ width: ((rowSize - 1) * rowNum) + 'px' }}>
      {
        squares.map((item, index) => (
          <Square
            key={index}
            value={item}
            size={rowSize}
            onClick={() => onClick(index)}
          />
        ))
      }
    </div>
  )
}

export default Board;