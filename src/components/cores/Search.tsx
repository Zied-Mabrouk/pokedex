import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import Button from './Button';

type Props = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

const Search = ({ search, setSearch }: Props) => {
  const onHandleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );
  return (
    <div className="w-full py-4 items-center flex gap-4">
      <input
        placeholder="Search for a pokemon..."
        className="rounded-lg px-4 py-2 w-full text-black-500"
        value={search}
        onChange={onHandleSearch}
      />
      <Button label="Advanced Search" />
    </div>
  );
};

export default Search;
