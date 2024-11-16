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
  setSearch: (callback: (val: SearchType) => SearchType) => void;
  indexKey: keyof SearchType;
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
          [indexKey]: { ...(prevSearch[indexKey] as any), attribute },
        }));
      },
      (value: string) => {
        setSearch((prevSearch) => ({
          ...prevSearch,
          [indexKey]: { ...(prevSearch[indexKey] as any), value },
        }));
      },
    ],
    [setSearch, indexKey]
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
