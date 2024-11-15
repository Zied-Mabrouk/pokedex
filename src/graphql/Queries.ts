import { gql } from '@apollo/client';

const GetPokemonsQuery = gql`
  query getItems($limit: Int, $offset: Int) {
    pokemon_v2_pokemonspecies(
      limit: $limit
      offset: $offset
      distinct_on: evolution_chain_id
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
    pokemon_v2_pokemonspecies_aggregate(distinct_on: evolution_chain_id) {
      aggregate {
        count
      }
    }
  }
`;

export { GetPokemonsQuery };
