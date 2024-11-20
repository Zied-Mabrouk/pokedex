import { PokemonTypeEnum } from './pokemon';

export type SelectValue = {
  value: string;
  label: string;
};

export type AdvancedSearchItemType = {
  attribute: string;
  value?: string;
};

export type OrderType = {
  field?: string;
  order?: 'asc' | 'desc';
};

export type SearchType = {
  mainSearch: string;
  statsSearch: AdvancedSearchItemType;
  typeSearch: PokemonTypeEnum | '';
};
export type ValueOf<T> = T[keyof T];
