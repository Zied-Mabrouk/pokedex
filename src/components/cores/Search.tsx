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
import { SearchType } from '../../types/misc';
import AdvancedSearchItem from './AdvancedSearchItem';

type Props = {
  search: SearchType;
  setSearch: Dispatch<SetStateAction<SearchType>>;
};

const Search = ({ search, setSearch }: Props) => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const handleShowAdvancedSearch = useCallback(() => {
    setShowAdvancedSearch((prev) => !prev);
  }, []);

  const options = useMemo(
    () => transformSelectValues(['height', 'weight', 'base_experience']),
    []
  );

  const [onHandleSearch] = useMemo(
    () => [
      (value: string) => {
        setSearch((prevSearch) => ({ ...prevSearch, mainSearch: value }));
      },
    ],
    [setSearch]
  );

  return (
    <div className="w-full py-4 flex flex-col">
      <div className="items-center flex gap-4">
        <Input
          value={search.mainSearch}
          onChange={onHandleSearch}
          placeholder="Search for a pokemon..."
        />
        <Button onClick={handleShowAdvancedSearch} label="Advanced Search" />
      </div>
      <div
        className={`mt-4 transition-all duration-[1s] bg-gray-600 bg-opacity-10 rounded-lg px-2 relative flex flex-col overflow-auto remove-scrollbars ${
          showAdvancedSearch ? 'h-64 max-h-80' : 'h-0'
        }`}
      >
        <AdvancedSearchItem
          advancedSearch={search.advancedSearch}
          options={options}
          setSearch={setSearch}
        />
      </div>
    </div>
  );
};

export default Search;
