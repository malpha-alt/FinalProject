export async function fetchPokemonByIdOrName(idOrName: string | number) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
    if (!res.ok) throw new Error('Pokemon not found');
    return res.json();
  }
  
  export async function fetchRandomPokemon() {
    const randomId = Math.floor(Math.random() * 1010) + 1; // ~1010 Pokémon
    return fetchPokemonByIdOrName(randomId);
  }
  