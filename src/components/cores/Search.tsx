import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import Button from './Button';
import Input from './Input';
import { transformSelectValues } from '../../utils/data';
import { OrderType, SearchType, SelectValue } from '../../types/misc';
import AdvancedSearchItem from './AdvancedSearchItem';
import { PokemonStatsEnum, PokemonTypeEnum } from '../../types/pokemon';
import Select from './Select';
import Dropdown from './Dropdown';
import { FaSortAmountDown } from 'react-icons/fa';

type Props = {
  search: SearchType;
  setSearch: (callback: (val: SearchType) => SearchType) => void;
  setOrderBy: Dispatch<SetStateAction<OrderType>>;
};

const Search = ({ search, setSearch, setOrderBy }: Props) => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const handleShowAdvancedSearch = useCallback(() => {
    setShowAdvancedSearch((prev) => !prev);
  }, []);

  const handleSortChange = useCallback(
    (selectValue: SelectValue) => {
      setOrderBy(JSON.parse(selectValue.value) as OrderType);
    },
    [setOrderBy]
  );

  const [statsOptions, typeOptions, sortOptions] = useMemo(
    () => [
      transformSelectValues([
        PokemonStatsEnum.HP,
        PokemonStatsEnum.ATTACK,
        PokemonStatsEnum.DEFENSE,
        PokemonStatsEnum.SPECIAL_ATTACK,
        PokemonStatsEnum.SPECIAL_DEFENSE,
        PokemonStatsEnum.SPEED,
      ]),
      transformSelectValues([
        PokemonTypeEnum.BUG,
        PokemonTypeEnum.DARK,
        PokemonTypeEnum.DRAGON,
        PokemonTypeEnum.ELECTRIC,
        PokemonTypeEnum.FAIRY,
        PokemonTypeEnum.FIGHTING,
        PokemonTypeEnum.FIRE,
        PokemonTypeEnum.FLYING,
        PokemonTypeEnum.GHOST,
        PokemonTypeEnum.GRASS,
        PokemonTypeEnum.GROUND,
        PokemonTypeEnum.ICE,
        PokemonTypeEnum.NORMAL,
        PokemonTypeEnum.POISON,
        PokemonTypeEnum.PSYCHIC,
        PokemonTypeEnum.ROCK,
        PokemonTypeEnum.STEEL,
        PokemonTypeEnum.WATER,
      ]),
      [
        { label: '-- Select an option --', value: '{}' },
        {
          label: 'Name A-Z',
          value: '{"field":"name","order":"asc"}',
        },
        {
          label: 'Name Z-A',
          value: '{"field":"name","order":"desc"}',
        },
      ],
    ],
    []
  );

  const [onHandleSearch, onHandleTypeSearch, onResetResearch] = useMemo(
    () => [
      (value: string) => {
        setSearch((prevSearch) => ({ ...prevSearch, mainSearch: value }));
      },
      (value: SelectValue) => {
        setSearch((prevSearch) => ({
          ...prevSearch,
          typeSearch: value.value as PokemonTypeEnum,
        }));
      },
      () => {
        setSearch(() => ({
          mainSearch: '',
          statsSearch: {
            attribute: '',
          },
          typeSearch: '',
        }));
      },
    ],
    [setSearch]
  );

  return (
    <div className="w-full py-4 flex flex-col">
      <div className="flex-col sm:flex-row sm:items-center flex gap-4">
        <Input
          value={search.mainSearch}
          onChange={onHandleSearch}
          placeholder="Search for a pokemon..."
        />
        <div className="flex gap-2 items-center">
          <Button
            onClick={handleShowAdvancedSearch}
            label="Advanced Search"
            className="sm:h-[38px]"
          />
          <Button
            onClick={onResetResearch}
            label="Reset"
            className="sm:h-[38px]"
          />
          <Dropdown
            onSelect={handleSortChange}
            options={sortOptions}
            buttonContent={<FaSortAmountDown />}
            buttonClassName="sm:h-[38px]"
          />
        </div>
      </div>

      <div
        className={`mt-4 transition-all duration-[1s] bg-gray-600 bg-opacity-10 rounded-lg px-2 relative flex flex-col overflow-auto remove-scrollbars ${
          showAdvancedSearch ? 'h-64 max-h-80' : 'h-0'
        }`}
      >
        <AdvancedSearchItem
          indexKey="statsSearch"
          advancedSearch={search.statsSearch}
          options={statsOptions}
          setSearch={setSearch}
        />
        <Select
          onChange={onHandleTypeSearch}
          label="Type"
          options={typeOptions}
          selected={search.typeSearch}
        />
      </div>
    </div>
  );
};

export default Search;
