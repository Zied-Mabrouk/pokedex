import { gql } from '@apollo/client';

const GetPokemonsQuery = gql`
  query getItemsWithSearch(
    $limit: Int
    $offset: Int
    $searchTerm: String!
    $stats_filters: pokemon_v2_pokemonstat_bool_exp!
    $type_filters: pokemon_v2_pokemontype_bool_exp!
    $order_by: [pokemon_v2_pokemon_order_by!]
  ) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: {
        name: { _like: $searchTerm }
        pokemon_v2_pokemontypes: $type_filters
        pokemon_v2_pokemonstats: $stats_filters
      }
      order_by: $order_by
    ) {
      base_experience
      name
      height
      weight
      id
      pokemon_v2_pokemoncries {
        cries
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemoncolor {
          name
        }
      }
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

    pokemon_v2_pokemon_aggregate(
      where: {
        name: { _like: $searchTerm }
        pokemon_v2_pokemontypes: $type_filters
        pokemon_v2_pokemonstats: $stats_filters
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export { GetPokemonsQuery };
