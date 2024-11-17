import React from 'react';

type Props = {
  name: string;
  hp: number;
};

const PokemonHeader = ({ name, hp }: Props) => {
  return (
    <div className="px-4 py-2 w-full justify-between flex items-center z-10 gap-4">
      <span className="uppercase text-xl whitespace-nowrap overflow-hidden text-ellipsis font-bold text-shadow h-fit leading-normal">
        {name}
      </span>
      <span className="font-bold uppercase text-shadow whitespace-nowrap">
        HP: {hp}
      </span>
    </div>
  );
};

export default PokemonHeader;
