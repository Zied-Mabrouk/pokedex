import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { GetPokemonsQuery } from '../../graphql/Queries';
import PokemonCard from '../cores/PokemonCard';
import { PokemonType } from '../../types/pokemon';
import { parseData, parsePokemonDataSet } from '../../utils/data';
import { useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../cores/Pagination';
import Loader from '../cores/Loader';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState<number>(
    parseInt(searchParams.get('page') ?? '1')
  );
  const [pagesNumber, setPageNumbers] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [pokemonsList, setPokemonsList] = useState<PokemonType[]>([]);

  const { loading, refetch } = useQuery(GetPokemonsQuery, {
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 10,
      offset: (page - 1) * 10,
      searchTerm: '%',
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
    setSearchParams({});
    setPage(1);
  }, [search]);

  useEffect(() => {
    refetch({
      limit: 10,
      offset: (page - 1) * 10,
      searchTerm: `${search}%`,
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

  const onHandleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  return (
    <div className="max-w-4xl mx-auto flex flex-col min-h-screen w-full px-8">
      <div className="w-full py-4">
        <input
          placeholder="Search for a pokemon..."
          className="rounded-lg px-4 py-2 w-full text-black-500"
          value={search}
          onChange={onHandleSearch}
        />
      </div>
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
