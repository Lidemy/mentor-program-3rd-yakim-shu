import React from "react";
import { Dropdown } from 'react-bootstrap';

const Moves = ({ history, jumpTo, term, winner }) => {
  const style = term ? 'black' : 'white';
  const winnerMsg = winner === 'X' ? 'Pacman win' : 'Ghost win';
  return (
    <div class='info'>
      <h1 className='info-title'>
        {winner ? winnerMsg : `Pac-Man Gobang!`}
      </h1>

      <Dropdown className={`${style} info-selection`}>
        <Dropdown.Toggle
          variant="secondary" id="dropdown-basic">
          Next one is <span className='icon'></span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            history.map((step, move) => {
              const desc = move ? "Go to move #" + move : "Go to game start";
              return (
                <Dropdown.Item
                  key={move}
                  onClick={() => jumpTo(move)}>
                  {desc}
                </Dropdown.Item>
              );
            })
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default Moves;