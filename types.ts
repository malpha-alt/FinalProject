export type Pokemon = {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
    types: Array<{
      type: {
        name: string;
      };
    }>;
    stats: Array<{
      base_stat: number;
      stat: {
        name: string;
      };
    }>;
    height: number;
    weight: number;
    base_experience: number;
    abilities: Array<{
      ability: {
        name: string;
      };
    }>;
  }
  
  export type PokemonListResponse = {
    results: Array<{
      name: string;
      url: string;
    }>;
    count: number;
  }