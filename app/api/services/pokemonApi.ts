// Pokemon API service by matheus alpha U63492196

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonByName(name: string): Promise<any> {
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

export async function fetchRandomPokemons(count: number): Promise<any[]> {
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
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }
  const data = await res.json();
  return data.results; // [{name, url}, {name, url}, ...]
}


/**
 * Fetch detailed information about a specific Pokémon.
 */
export async function fetchPokemonDetails(name: string): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch Pokémon details: ${response.statusText}`
      );
    }
    const data = await response.json();

    // Extract relevant details
    return {
      id: data.id,
      name: data.name,
      abilities: data.abilities.map((a: any) => a.ability.name),
      base_experience: data.base_experience,
      height: data.height,
      weight: data.weight,
      types: data.types.map((t: any) => t.type.name),
      stats: data.stats.map((s: any) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
      sprites: data.sprites.other["official-artwork"].front_default,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
