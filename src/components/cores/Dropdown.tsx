import React, { ReactNode, useCallback, useState } from 'react';
import Button from './Button';
import { SelectValue } from '../../types/misc';

type Props = {
  buttonContent: ReactNode | string;
  onSelect: (val: SelectValue) => void;
  options: SelectValue[];
};

const Dropdown = ({ buttonContent, onSelect, options }: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggle = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  const handleItemClick = useCallback(
    (opt: SelectValue) => {
      onSelect(opt);
      setShowMenu(false);
    },
    [onSelect]
  );

  return (
    <div className="relative">
      <Button onClick={handleToggle} label={buttonContent} />

      {showMenu && (
        <div
          id="dropdown"
          className="z-10 absolute right-0 top-[calc(100%+10px)] bg-white divide-y bg-white-500 bg-opacity-20 rounded-lg shadow w-44"
        >
          <ul
            className="text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {options.map((opt, index) => (
              <li
                onClick={() => handleItemClick(opt)}
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-white-500 rounded-lg hover:bg-opacity-10"
              >
                {opt.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
