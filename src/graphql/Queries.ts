import { gql } from '@apollo/client';

const GetPokemonsQuery = gql`
  query getItems(
    $limit: Int
    $offset: Int
    $searchTerm: String!
    $height: Int = 0
    $weight: Int = 0
    $base_experience: Int = 0
  ) {
    pokemon_v2_pokemonspecies(
      limit: $limit
      offset: $offset
      where: {
        _or: [
          { _not: { pokemon_v2_pokemonspecy: {} } }
          { pokemon_v2_pokemonspecy: { is_baby: { _eq: true } } }
        ]
        name: { _like: $searchTerm }
        pokemon_v2_pokemons: {
          base_experience: { _gte: $base_experience }
          height: { _gte: $height }
          weight: { _gte: $weight }
        }
      }
    ) {
      id
      evolution_chain_id
      name
      pokemon_v2_pokemons {
        base_experience
        height
        weight
        pokemon_v2_pokemonsprites {
          sprites
        }
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
      pokemon_v2_pokemoncolor {
        name
      }
    }
    pokemon_v2_pokemonspecies_aggregate(
      where: {
        _or: [
          { _not: { pokemon_v2_pokemonspecy: {} } }
          { pokemon_v2_pokemonspecy: { is_baby: { _eq: true } } }
        ]
        name: { _like: $searchTerm }
        pokemon_v2_pokemons: {
          base_experience: { _gte: $base_experience }
          height: { _gte: $height }
          weight: { _gte: $weight }
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export { GetPokemonsQuery };
