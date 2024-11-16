import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetPokemonsQuery } from '../../graphql/Queries';
import PokemonCard from '../cores/PokemonCard';
import { PokemonType } from '../../types/pokemon';
import { parseData, parsePokemonDataSet } from '../../utils/data';
import { useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../cores/Pagination';
import Loader from '../cores/Loader';
import Search from '../cores/Search';
import { SearchType } from '../../types/misc';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState<number>(
    parseInt(searchParams.get('page') ?? '1')
  );
  const [pagesNumber, setPageNumbers] = useState<number>(0);
  const [search, setSearch] = useState<SearchType>({
    mainSearch: '',
    statsSearch: {
      attribute: '',
    },
    typeSearch: '',
  });
  const [pokemonsList, setPokemonsList] = useState<PokemonType[]>([]);

  const { loading, refetch } = useQuery(GetPokemonsQuery, {
    notifyOnNetworkStatusChange: true,
    skip: !!search.mainSearch || !!search.statsSearch.value,
    variables: {
      limit: 10,
      offset: (page - 1) * 10,
      searchTerm: '%',
      filters: {},
    },
    onCompleted: (data) => {
      const parsedSpecies = parseData(data);
      const parsedCount = parseData(data, false, 1);

      setPageNumbers(Math.ceil(parsedCount.aggregate.count / 10));
      setPokemonsList(parsePokemonDataSet(parsedSpecies));
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onChangePage = useCallback(
    (p: number) => {
      setSearchParams({ page: p.toString() });
      setPage(p);
    },
    [setSearchParams]
  );

  useEffect(() => {
    const statsSearch =
      search.statsSearch.attribute && search.statsSearch.value
        ? {
            pokemon_v2_pokemonstats: {
              _and: {
                base_stat: { _eq: parseInt(search.statsSearch.value) },
                pokemon_v2_stat: {
                  name: { _eq: search.statsSearch.attribute },
                },
              },
            },
          }
        : {};

    const typeSearch = search.typeSearch
      ? {
          pokemon_v2_pokemontypes: {
            pokemon_v2_type: { name: { _eq: search.typeSearch } },
          },
        }
      : {};

    refetch({
      limit: 10,
      offset: (page - 1) * 10,
      searchTerm: `${search.mainSearch.toLowerCase()}%`,
      filters: { ...statsSearch, ...typeSearch },
    }).then((data) => {
      const parsedSpecies = parseData(data.data);
      const parsedCount = parseData(data.data, false, 1);
      setPageNumbers(Math.ceil(parsedCount.aggregate.count / 10));
      setPokemonsList(parsePokemonDataSet(parsedSpecies));
    });
  }, [search, refetch, page]);

  const paginationElement = useMemo(
    () => (
      <div className="w-full flex justify-center">
        <Pagination
          currentPage={page}
          pages={pagesNumber}
          onChangePage={onChangePage}
        />
      </div>
    ),
    [page, pagesNumber, onChangePage]
  );

  const handleSearchChange = useCallback(
    (callback: (val: SearchType) => SearchType) => {
      setSearch((prev) => {
        setSearchParams({});
        setPage(1);
        return callback(prev);
      });
    },
    [setSearchParams]
  );

  return (
    <div className="max-w-4xl mx-auto flex flex-col min-h-screen w-full px-8">
      <Search search={search} setSearch={handleSearchChange} />
      <div className="flex flex-col h-full justify-between py-4 flex-1">
        {paginationElement}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-8 py-4">
            {pokemonsList.map((pokemon: PokemonType) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
        {paginationElement}
      </div>
    </div>
  );
};

export default Home;
