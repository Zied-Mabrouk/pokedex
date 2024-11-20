import React, { useMemo } from 'react';
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
  setSearch: (callback: (val: SearchType) => SearchType) => void;
  indexKey: keyof Pick<SearchType, 'statsSearch'>;
};

const AdvancedSearchItem = ({
  options,
  advancedSearch,
  setSearch,
  indexKey,
}: Props) => {
  const [onAttributeChange, onValueChange] = useMemo(
    () => [
      (attribute: string) => {
        setSearch((prevSearch) => ({
          ...prevSearch,
          [indexKey]: {
            ...prevSearch[indexKey],
            attribute,
          },
        }));
      },
      (value: string) => {
        setSearch((prevSearch) => ({
          ...prevSearch,
          [indexKey]: { ...prevSearch[indexKey], value },
        }));
      },
    ],
    [setSearch, indexKey]
  );
  return (
    <div className="py-4 w-full flex gap-2 sm:gap-8">
      <Select
        label={'Filter By Pokemon Stat'}
        onChange={(value) => onAttributeChange(value.value)}
        options={options}
        selected={advancedSearch.attribute}
      />
      {advancedSearch.attribute && (
        <div className="flex items-end w-full">
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
