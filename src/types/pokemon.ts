type PokemonSpriteType = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

export enum PokemonTypeEnum {
  NORMAL = 'normal',
  FIRE = 'fire',
  WATER = 'water',
  GRASS = 'grass',
  ICE = 'ice',
  ELECTRIC = 'electric',
  PSYCHIC = 'psychic',
  FIGHTING = 'fighting',
  POISON = 'poison',
  GROUND = 'ground',
  FLYING = 'flying',
  BUG = 'bug',
  ROCK = 'rock',
  GHOST = 'ghost',
  STEEL = 'steel',
  DRAGON = 'dragon',
  DARK = 'dark',
  FAIRY = 'fairy',
}

export enum PokemonStatsEnum {
  HP = 'hp',
  ATTACK = 'attack',
  DEFENSE = 'defense',
  SPECIAL_ATTACK = 'special-attack',
  SPECIAL_DEFENSE = 'special-defense',
  SPEED = 'speed',
}

type PokemonStatsType = Record<PokemonStatsEnum, number>;

type PokemonCriesType = {
  lastest: string;
  legacy: string;
};

export type PokemonAggregateRawDataType = {
  aggregate: { count: number };
};

export type PokemonRawDataType = {
  id: number;
  name: string;
  height: number;
  base_experience: number;
  pokemon_v2_pokemontypes: { pokemon_v2_type: { name: string } }[];
  pokemon_v2_pokemonstats: {
    pokemon_v2_stat: { name: string };
    base_stat: number;
  }[];
  pokemon_v2_pokemonsprites: {
    sprites: PokemonSpriteType | null;
  }[];
  pokemon_v2_pokemoncries: {
    cries: PokemonCriesType | null;
  }[];
  pokemon_v2_pokemonspecy: {
    pokemon_v2_pokemoncolor: { name: PokemonStatsEnum };
  };
};

export type PokemonApiResultType = {
  pokemon_v2_pokemon: PokemonRawDataType[];
  pokemon_v2_pokemon_aggregate: PokemonAggregateRawDataType;
};

export type PokemonType = {
  id: number;
  name: string;
  height: number;
  base_experience: number;
  types: string[];
  color: string;
  sprites: PokemonSpriteType | null;
  stats: PokemonStatsType;
  cries: PokemonCriesType | null;
};
