import { SelectValue } from '../types/misc';
import { PokemonType } from '../types/pokemon';

const parsePokemonData = (pokemon: any) => {
  const pokemonStat = pokemon.pokemon_v2_pokemons[0];
  return {
    id: pokemon.id,
    name: pokemon.name,
    height: pokemonStat.base_experience,
    base_experience: pokemonStat.base_experience,
    types: pokemonStat.pokemon_v2_pokemontypes.map(
      (type: any) => type.pokemon_v2_type.name
    ),
    sprites: pokemonStat.pokemon_v2_pokemonsprites[0].sprites,
    color: pokemon.pokemon_v2_pokemoncolor.name,
  };
};
export const parsePokemonDataSet = (data: any[]): PokemonType[] => {
  return data
    ?.filter((pokemon) => !!pokemon.pokemon_v2_pokemons)
    .map((pokemon) => parsePokemonData(pokemon));
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
