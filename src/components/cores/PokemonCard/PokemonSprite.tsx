import React from 'react';
import { PokemonType } from '../../../types/pokemon';

type Props = {
  sprites: PokemonType['sprites'];
};

const PokemonSprite = ({ sprites }: Props) => {
  return (
    <div className="w-full px-4 py-2 min-h-[60%] sm:min-h-[66%] flex-1 overflow-hidden">
      <div className="w-full relative h-full">
        <div className="box__line box__line--top"></div>
        <div className="box__line box__line--right"></div>
        <div className="box__line box__line--bottom"></div>
        <div className="box__line box__line--left"></div>
        <img
          src={
            sprites?.front_default ??
            sprites?.front_shiny ??
            'https://icons.veryicon.com/png/o/miscellaneous/basic-icon-1/unknown-18.png'
          }
          alt={'unknown'}
          className="w-full object-contain relative h-full"
        />
      </div>
    </div>
  );
};

export default PokemonSprite;
