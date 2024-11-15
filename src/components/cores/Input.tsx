import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useCallback,
} from 'react';

type Props = Pick<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'value' | 'placeholder' | 'type'
> & {
  onChange: (value: string) => void;
};

const Input = ({ onChange, ...props }: Props) => {
  const onHandleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );
  return (
    <input
      className="rounded-lg px-4 py-2 w-full text-black-500"
      onChange={onHandleSearch}
      {...props}
    />
  );
};

export default Input;
