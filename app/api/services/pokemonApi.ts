// Pokemon API service by matheus alpha U63492196

import { Pokemon } from "@/types";
const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonByName(name: string): Promise<Pokemon> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchRandomPokemons(count: number): Promise<Pokemon[]> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=1000`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon list: ${response.statusText}`);
    }
    const data = await response.json();
    const allPokemons = data.results;

    // Randomly select count Pokémon from the list
    const randomPokemons = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * allPokemons.length);
      const randomPokemon = allPokemons[randomIndex];
      randomPokemons.push(randomPokemon);
    }

    // Fetch detailed data for each random Pokémon
    const detailedPokemons = await Promise.all(
      randomPokemons.map((pokemon: { name: string }) =>
        fetchPokemonByName(pokemon.name)
      )
    );

    return detailedPokemons;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Fetch a list of Pokémon with minimal information (name and URL).
 */
export async function fetchPokemonList(limit = 20, offset = 0) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }
  const data = await res.json();
  return data.results; // [{name, url}, {name, url}, ...]
}

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
