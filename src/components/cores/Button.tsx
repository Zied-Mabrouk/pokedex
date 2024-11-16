import React, { HTMLAttributes, ReactNode, useMemo } from 'react';
import { PokemonTypeEnum } from '../../types/pokemon';
import { twMerge } from 'tailwind-merge';

type Props = Pick<
  HTMLAttributes<HTMLButtonElement>,
  'onClick' | 'className' | 'title'
> & {
  label: string | ReactNode;
  variant?: PokemonTypeEnum;
};

const Button = ({
  label,
  onClick,
  variant = PokemonTypeEnum.POISON,
  className: inComingClassName = '',
  title,
}: Props) => {
  const className = useMemo(
    () =>
      twMerge(
        `px-4 py-2 rounded-lg h-fit whitespace-nowrap bg-${variant} ${inComingClassName} `
      ),
    [inComingClassName, variant]
  );
  return (
    <button className={className} onClick={onClick} title={title}>
      {label}
    </button>
  );
};

export default Button;
