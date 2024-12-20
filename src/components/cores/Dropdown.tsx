import React, { ReactNode, useCallback, useState } from 'react';
import Button from './Button';
import { SelectValue } from '../../types/misc';

type Props = {
  buttonContent: ReactNode | string;
  onSelect: (val: SelectValue) => void;
  options: SelectValue[];
  buttonClassName?: string;
};

const Dropdown = ({
  buttonContent,
  onSelect,
  options,
  buttonClassName = '',
}: Props) => {
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
      <Button
        onClick={handleToggle}
        label={buttonContent}
        className={buttonClassName}
      />

      {showMenu && (
        <div
          id="dropdown"
          className="z-10 absolute right-0 top-[calc(100%+10px)] bg-white divide-y bg-black-500 bg-opacity-70 rounded-lg shadow-white-500 w-fit"
        >
          <ul
            className="text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {options.map((opt, index) => (
              <li
                onClick={() => handleItemClick(opt)}
                key={index}
                className="px-4 py-2 text-lg cursor-pointer hover:bg-white-500 rounded-lg hover:bg-opacity-10 whitespace-nowrap"
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
