import React, { useState } from 'react';

import './Board.scss';

const Board = () => {
  const [flipped, setFlipped] = useState(false);
  return (
    <article className="board ">
      <button
        className={'card' + (flipped ? ' flipped' : '')}
        onClick={() => setFlipped((prev) => !prev)}
      >
        <span className="wrapper">
          <span className="content">
            <span className="face back"></span>
            <span className="face front"></span>
          </span>
        </span>
      </button>
    </article>
  );
};

export default Board;
