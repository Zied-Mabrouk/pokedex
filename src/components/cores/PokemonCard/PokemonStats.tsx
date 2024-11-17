import React, { useMemo } from 'react';
import { PokemonType } from '../../../types/pokemon';
import { getPokemonTypeColors } from '../../../utils/pokemon';

type Props = {
  types: PokemonType['types'];
  stats: PokemonType['stats'];
};

const PokemonStats = ({ types, stats }: Props) => {
  const typeElements = useMemo(() => getPokemonTypeColors(types), [types]);

  return (
    <div className="p-2 w-full flex h-fit">
      <div className="flex py-4 justify-between w-full items-end rounded-lg bg-opacity-20 bg-gray-200 px-2">
        <div className="uppercase font-bold text-shadow items-start flex flex-col gap-2 text-xs xs:text-base">
          <span className="whitespace-nowrap tracking-tighter">
            attack: {stats.attack}
          </span>
          <span className="whitespace-nowrap tracking-tighter">
            defense: {stats.defense}
          </span>
          <span className="whitespace-nowrap tracking-tighter">
            special attack: {stats['special-attack']}
          </span>
          <span className="whitespace-nowrap tracking-tighter">
            special defense: {stats['special-attack']}
          </span>
        </div>
        <div className="flex gap-4 items-center">
          {typeElements?.map((type) => {
            const Icon = type.icon;
            return (
              <span
                className={`rounded-full bg-opacity-40 border border-white bg-${type.type}`}
                key={type.type}
                title={type.type}
              >
                <Icon className="p-1 text-xl xs:text-xl w-fit h-fit" />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonStats;
