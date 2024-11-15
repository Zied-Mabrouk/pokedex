import React, { Dispatch, SetStateAction, useMemo } from 'react';
import Select from './Select';
import {
  AdvancedSearchItemType,
  SearchType,
  SelectValue,
} from '../../types/misc';
import Input from './Input';

type Props = {
  options: SelectValue[];
  advancedSearch: AdvancedSearchItemType;
  setSearch: Dispatch<SetStateAction<SearchType>>;
};

const AdvancedSearchItem = ({ options, advancedSearch, setSearch }: Props) => {
  const [onAttributeChange, onValueChange] = useMemo(
    () => [
      (attribute: string) => {
        setSearch((prevSearch) => ({
          ...prevSearch,
          advancedSearch: { ...prevSearch.advancedSearch, attribute },
        }));
      },
      (value: string) => {
        setSearch((prevSearch) => ({
          ...prevSearch,
          advancedSearch: { ...prevSearch.advancedSearch, value },
        }));
      },
    ],
    [setSearch]
  );
  return (
    <div className="py-4 w-full flex gap-8">
      <Select
        label={'select'}
        onChange={(value) => onAttributeChange(value.value)}
        options={options}
        selected={advancedSearch.attribute}
      />
      {advancedSearch.attribute && (
        <div className="flex items-end w-1/2">
          <Input
            value={advancedSearch.value ?? ''}
            type="number"
            onChange={onValueChange}
            placeholder={`Search By ${advancedSearch.attribute}...`}
          />
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchItem;
