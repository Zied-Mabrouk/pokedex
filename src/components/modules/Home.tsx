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
import { OrderType, SearchType } from '../../types/misc';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState<number>(
    parseInt(searchParams.get('page') ?? '1')
  );
  const [pagesNumber, setPageNumbers] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<OrderType>({});
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
      stats_filters: {},
      type_filters: {},
      order_by: {},
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
            _and: {
              base_stat: { _eq: parseInt(search.statsSearch.value) },
              pokemon_v2_stat: {
                name: { _eq: search.statsSearch.attribute },
              },
            },
          }
        : {};

    const typeSearch = search.typeSearch
      ? {
          pokemon_v2_type: { name: { _eq: search.typeSearch } },
        }
      : {};

    refetch({
      limit: 10,
      offset: (page - 1) * 10,
      searchTerm: `${search.mainSearch.toLowerCase()}%`,
      stats_filters: statsSearch,
      type_filters: typeSearch,
      order_by: orderBy.field ? { [orderBy.field]: orderBy.order } : {},
    }).then((data) => {
      const parsedSpecies = parseData(data.data);
      const parsedCount = parseData(data.data, false, 1);

      setPageNumbers(Math.ceil(parsedCount.aggregate.count / 10));
      setPokemonsList(parsePokemonDataSet(parsedSpecies));
    });
  }, [search, refetch, page, orderBy]);

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
    <div className="md:max-w-4xl lg:max-w-[75rem] mx-auto flex flex-col min-h-screen w-full px-4 sm:px-8 overflow-hidden">
      <h1 className="text-4xl sm:text-6xl lg:text-8xl text-center mt-8 mb-8 font-bold uppercase tracking-wider">
        PokéDex
      </h1>
      <Search
        search={search}
        setSearch={handleSearchChange}
        setOrderBy={setOrderBy}
      />
      <div className="flex flex-col h-full justify-between py-4 flex-1">
        {paginationElement}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 justify-center gap-6 md:gap-4 xl:gap-8 py-8">
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
