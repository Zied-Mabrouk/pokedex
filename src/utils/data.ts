import { SelectValue, ValueOf } from '../types/misc';
import {
  PokemonRawDataType,
  PokemonStatsEnum,
  PokemonType,
} from '../types/pokemon';

const parsePokemonData = (pokemon: PokemonRawDataType): PokemonType => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height,
    base_experience: pokemon.base_experience,
    types: pokemon.pokemon_v2_pokemontypes.map(
      (type) => type.pokemon_v2_type.name
    ),
    sprites: pokemon.pokemon_v2_pokemonsprites.at(0)?.sprites ?? null,
    stats: pokemon.pokemon_v2_pokemonstats.reduce((acc, curr) => {
      return { ...acc, [curr.pokemon_v2_stat.name]: curr.base_stat };
    }, {} as Record<PokemonStatsEnum, number>),
    cries: pokemon.pokemon_v2_pokemoncries.at(0)?.cries ?? null,
    color: pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name,
  };
};

export const parsePokemonDataSet = (
  data: PokemonRawDataType[]
): PokemonType[] => {
  return data.map((pokemon) => parsePokemonData(pokemon));
};

export const transformSelectValue = (option: string): SelectValue => {
  return {
    value: option,
    label: option,
  };
};

export const transformSelectValues = (options: string[]): SelectValue[] => {
  return options.map(transformSelectValue);
};
