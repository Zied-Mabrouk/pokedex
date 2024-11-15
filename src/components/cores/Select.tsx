import React, { ReactNode, useCallback } from 'react';
import { transformSelectValue } from '../../utils/data';
import SelectComponent from 'react-select';
import { SelectValue } from '../../types/misc';

type Props = {
  label: string | ReactNode;
  options: SelectValue[];
  selected?: string;
  onChange: (newItem: SelectValue) => void;
};

const Select = ({ label, options, selected, onChange }: Props) => {
  const handleChange = useCallback(
    (value: unknown) => {
      const newValue = value as SelectValue;
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="capitalize">{label}</label>
      <SelectComponent
        className="text-black-500"
        placeholder="-- Select an option --"
        onChange={handleChange}
        value={selected ? transformSelectValue(selected) : null}
        options={options}
        maxMenuHeight={150}
      ></SelectComponent>
    </div>
  );
};

export default Select;
