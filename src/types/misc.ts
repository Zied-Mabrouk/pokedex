import { PokemonTypeEnum } from './pokemon';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

export type SelectValue = {
  value: string;
  label: string;
};

export type AdvancedSearchItemType = {
  attribute: string;
  value?: string;
};

export type SearchType = {
  mainSearch: string;
  statsSearch: AdvancedSearchItemType;
  typeSearch: PokemonTypeEnum | '';
};
