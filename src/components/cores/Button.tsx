import React from 'react';

type Props = {
  label: string;
};

const Button = ({ label }: Props) => {
  return (
    <button className="px-4 py-2 rounded-lg bg-fire h-fit whitespace-nowrap">
      {label}
    </button>
  );
};

export default Button;
