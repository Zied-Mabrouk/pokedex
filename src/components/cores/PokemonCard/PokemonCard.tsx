import React, { LegacyRef, useCallback } from 'react';
import { PokemonType } from '../../../types/pokemon';
import useSound from 'use-sound';
import RotatingCard from '../RotatingCard';
import PokemonSprite from './PokemonSprite';
import PokemonStats from './PokemonStats';
import PokemonHeader from './PokemonHeader';

type Props = {
  pokemon: PokemonType;
  pokemonRef?: LegacyRef<HTMLDivElement> | undefined;
};

const PokemonCard = ({ pokemon, pokemonRef }: Props) => {
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
    <RotatingCard>
      <div
        ref={pokemonRef}
        onClick={onClick}
        title="Click on the card to hear the Pokémon sound"
        className={`h-full rounded-lg relative shadow-md border-8 border-inset border-black overflow-hidden bg-opacity-80 bg-${pokemon.color}-500`}
      >
        <div className="absolute top-0 left-0 w-full h-full pattern z-0"></div>
        <div className="h-full w-full flex flex-col">
          <PokemonHeader hp={pokemon.stats.hp} name={pokemon.name} />
          <div className="flex flex-col max-h-[calc(100%-46px)]">
            <PokemonSprite sprites={pokemon.sprites} />

            <PokemonStats stats={pokemon.stats} types={pokemon.types} />
          </div>
        </div>
      </div>
    </RotatingCard>
  );
};

export default PokemonCard;
