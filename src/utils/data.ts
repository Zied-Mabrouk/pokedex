import { SelectValue } from '../types/misc';
import { PokemonType } from '../types/pokemon';

const parsePokemonData = (pokemon: any) => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.base_experience,
    base_experience: pokemon.base_experience,
    types: pokemon.pokemon_v2_pokemontypes.map(
      (type: any) => type.pokemon_v2_type.name
    ),
    sprites: pokemon.pokemon_v2_pokemonsprites[0].sprites,
    stats: pokemon.pokemon_v2_pokemonstats.reduce(
      (acc: Record<string, number>, curr: any) => {
        return { ...acc, [curr.pokemon_v2_stat.name]: curr.base_stat };
      },
      {} as Record<string, number>
    ),
    color: pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name,
  };
};
export const parsePokemonDataSet = (data: any[]): PokemonType[] => {
  return data.map((pokemon) => parsePokemonData(pokemon));
};

export const parseData = (data: any[], isArray = true, index = 0) => {
  return isArray
    ? (Object.values(data)[index] as any[])
    : (Object.values(data)[index] as any);
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
