import React, { LegacyRef, useCallback, useMemo } from 'react';
import { PokemonType } from '../../types/pokemon';
import { getPokemonTypeColors } from '../../utils/pokemon';
import useSound from 'use-sound';

type Props = {
  pokemon: PokemonType;
  pokemonRef?: LegacyRef<HTMLDivElement> | undefined;
};

const PokemonCard = ({ pokemon, pokemonRef }: Props) => {
  const types = useMemo(
    () => getPokemonTypeColors(pokemon.types),
    [pokemon.types]
  );

  const [play] = useSound(
    pokemon.cries?.lastest || pokemon.cries?.legacy || '',
    {
      volume: 0.1,
    }
  );

  const onClick = useCallback(() => {
    play();
  }, [play]);
  return (
    <div
      ref={pokemonRef}
      onClick={onClick}
      title="Click on the card to hear the Pokémon sound"
      className="cursor-pointer transition-all duration-500 scale-100 hover:scale-105 w-full aspect-[1/1.2] md:aspect-[1/2] max-h-[30rem] max-w-[24rem] rounded-lg shadow-md border-8 border-inset border-black overflow-hidden"
    >
      <div
        className={`bg-${pokemon.color}-500 bg-opacity-80 h-full w-full relative flex flex-col`}
      >
        <div className="absolute top-0 left-0 w-full h-full pattern z-0"></div>
        <div className="px-4 py-2 w-full justify-between flex items-center z-10 gap-4">
          <span className="uppercase text-xl whitespace-nowrap overflow-hidden text-ellipsis font-bold text-shadow h-fit leading-normal">
            {pokemon.name}
          </span>
          <span className="font-bold uppercase text-shadow whitespace-nowrap">
            HP: {pokemon.stats.hp}
          </span>
        </div>
        <div className=" flex-col max-h-[calc(100%-46px)]">
          {pokemon.sprites && (
            <div className="w-full px-4 py-2 h-3/5 sm:h-2/3">
              <div className="w-full relative h-full">
                <div className="box__line box__line--top"></div>
                <div className="box__line box__line--right"></div>
                <div className="box__line box__line--bottom"></div>
                <div className="box__line box__line--left"></div>
                <img
                  src={
                    pokemon.sprites.front_default ?? pokemon.sprites.front_shiny
                  }
                  alt="pokemon.name"
                  className="w-full object-contain z-20 relative h-full"
                />
              </div>
            </div>
          )}
          <div className="p-2 w-full flex z-10 h-fit">
            <div className="flex py-4 justify-between w-full items-end rounded-lg bg-opacity-20 bg-gray-200 px-2">
              <div className="uppercase font-bold text-shadow flex flex-col gap-2 text-xs sm:text-sm md:text-base lg:text-sm">
                <span className="whitespace-nowrap">
                  attack: {pokemon.stats.attack}
                </span>
                <span className="whitespace-nowrap">
                  defense: {pokemon.stats.defense}
                </span>
                <span className="whitespace-nowrap">
                  special attack: {pokemon.stats['special-attack']}
                </span>
                <span className="whitespace-nowrap">
                  special defense: {pokemon.stats['special-attack']}
                </span>
              </div>
              <div className="flex gap-4 items-center">
                {types?.map((type) => {
                  const Icon = type.icon;
                  return (
                    <span
                      className={`rounded-full bg-opacity-40 border border-white bg-${type.type}`}
                      key={type.type}
                      title={type.type}
                    >
                      <Icon className="p-1 text-xl sm:text-2xl w-fit h-fit" />
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
