import React, { ReactNode, useState } from 'react';

import './Board.scss';

type Props = {
  children: ReactNode;
};

const RotatingCard = ({ children }: Props) => {
  const [flipped, setFlipped] = useState(true);
  return (
    <article className="board w-full aspect-[20/29] md:aspect-[1/2] max-w-[24rem] rounded-lg">
      <button
        className={'card h-full w-full' + (flipped ? ' flipped' : '')}
        onClick={() => setFlipped((prev) => !prev)}
      >
        <span className="wrapper h-full rounded-lg">
          <span className="content h-full rounded-lg">
            <span className="face back rounded-lg h-full"></span>
            <span className="face front rounded-lg">{children}</span>
          </span>
        </span>
      </button>
    </article>
  );
};

export default RotatingCard;
