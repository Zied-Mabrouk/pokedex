import React, { ReactNode, useMemo, useState } from 'react';
import { Tilt } from 'react-tilt';
import { isMobile } from 'react-device-detect';

type Props = {
  children: ReactNode;
};

const RotatingCard = ({ children }: Props) => {
  const [flipped, setFlipped] = useState(true);

  const [Element, defaultOptions] = useMemo(
    () => [
      isMobile ? React.Fragment : Tilt,
      {
        reverse: false, // reverse the tilt direction
        max: 50, // max tilt rotation (degrees)
        perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
        scale: 1, // 2 = 200%, 1.5 = 150%, etc..
        speed: 500, // Speed of the enter/exit transition
        transition: true, // Set a transition on enter/exit.
        axis: null, // What axis should be disabled. Can be X or Y.
        reset: true, // If the tilt effect has to be reset on exit.
        easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit.
      },
    ],
    []
  );

  return (
    <Element
      options={defaultOptions}
      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <article
        className={`board transition-all duration-1000 w-full max-w-[24rem] rounded-lg `}
      >
        <button
          className={`card h-full w-full ${flipped ? 'flipped' : ''}`}
          onClick={() => setFlipped((prev) => !prev)}
        >
          <span className="wrapper h-full rounded-lg">
            <span className="content h-full rounded-lg">
              <span className="face back rounded-lg h-full"></span>
              <span className="face front rounded-lg w-full ">{children}</span>
            </span>
          </span>
        </button>
      </article>
    </Element>
  );
};

export default RotatingCard;
