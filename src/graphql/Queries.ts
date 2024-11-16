import { gql } from '@apollo/client';

const GetPokemonsQuery = gql`
  query getItemsWithSearch(
    $limit: Int
    $offset: Int
    $searchTerm: String!
    $filters: pokemon_v2_pokemon_bool_exp!
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
        pokemon_v2_pokemons: $filters
      }
      order_by: { id: asc }
    ) {
      id
      evolution_chain_id
      name
      pokemon_v2_pokemons {
        base_experience
        height
        weight
        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat {
            name
          }
        }
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
        pokemon_v2_pokemons: $filters
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export { GetPokemonsQuery };
