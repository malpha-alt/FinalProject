//by matheus alpha U63492196

import { Pokemon } from "@/types";
const BASE_URL = "https://pokeapi.co/api/v2";

/**
 * Fetch detailed information about a specific Pokémon.
 */
export async function fetchPokemonDetails(name: string): Promise<Pokemon> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch Pokémon details: ${response.statusText}`
      );
    }
    const data = await response.json();

    // Transform the data to match the Pokemon type
    return {
      id: data.id,
      name: data.name,
      sprites: {
        front_default:
          data.sprites.other["official-artwork"].front_default ||
          data.sprites.front_default,
      },
      types: data.types.map((t: { type: { name: string } }) => ({
        type: {
          name: t.type.name,
        },
      })),
      stats: data.stats.map((s: { stat: { name: string }; base_stat: number }) => ({
        base_stat: s.base_stat,
        stat: {
          name: s.stat.name,
        },
      })),
      height: data.height,
      weight: data.weight,
      base_experience: data.base_experience,
      abilities: data.abilities.map((a: { ability: { name: string } }) => ({
        ability: {
          name: a.ability.name,
        },
      })),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
