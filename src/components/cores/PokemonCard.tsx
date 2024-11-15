import React, { LegacyRef, useMemo } from 'react';
import { PokemonType } from '../../types/pokemon';
import { getPokemonTypeColors } from '../../utils/pokemon';
import { Link } from 'react-router-dom';

type Props = {
  pokemon: PokemonType;
  pokemonRef?: LegacyRef<HTMLDivElement> | undefined;
};

const PokemonCard = ({ pokemon, pokemonRef }: Props) => {
  const typeColors = useMemo(
    () => getPokemonTypeColors(pokemon.types),
    [pokemon.types]
  );
  return (
    <div
      ref={pokemonRef}
      className="pokemon-card h-56 p-2 rounded-lg shadow-md border border-black relative"
    >
      <div className={`bg-${pokemon.color}-500 bg-opacity-80 h-full w-full`}>
        {pokemon.sprites && (
          <img
            src={pokemon.sprites.front_default}
            alt="pokemon.name"
            className="w-full object-contain h-full"
          />
        )}
        <div className="absolute bottom-0 left-0 flex p-4 justify-between w-full">
          <Link
            to={`/${pokemon.id}`}
            className="uppercase text-xl font-aero font-bold text-shadow "
          >
            {pokemon.name}
          </Link>
          <div className="flex gap-4 items-center">
            {typeColors?.map((typeColor) => {
              const Icon = typeColor.icon;
              return (
                <span
                  className={`rounded-full bg-opacity-40 border border-white bg-${typeColor.type}`}
                  key={typeColor.type}
                  title={typeColor.type}
                >
                  <Icon className="p-1 text-2xl w-fit h-fit" />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
