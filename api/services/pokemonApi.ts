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