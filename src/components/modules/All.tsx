import React, { useState } from 'react';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { GetPokemonsQuery } from '../../graphql/Queries';
import PokemonCard from '../cores/PokemonCard';
import { PokemonType } from '../../types/pokemon';
import { parsePokemonDataSet } from '../../utils/data';

type Props = {};

const All = (props: Props) => {
  const [pokemonsList, setPokemonsList] = useState<any[]>([]);
  //   const { name, filter, setFilter } = useSearchQuery<string>({
  //     router,
  //     delay: 500,
  //     initialFilterState: '',
  //   });

  const { ref, networkStatus, error, fetchMore, parentRef } = useInfiniteScroll(
    {
      query: GetPokemonsQuery,
      queryVariables: {},
      items: pokemonsList,
      setItems: setPokemonsList,
      limit: 10,
      offset: 0,
      parser: (newValues) => {
        return parsePokemonDataSet(newValues);
      },
    }
  );

  return (
    <div
      className="grid grid-cols-2 justify-center max-w-4xl mx-auto gap-8"
      ref={parentRef}
    >
      {pokemonsList.map((pokemon: PokemonType) => (
        <PokemonCard pokemonRef={ref} key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default All;
