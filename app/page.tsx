"use client";
import React, { useEffect, useState } from "react";
import { fetchRandomPokemons } from "@/api/services/pokemonApi";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

const HomePage: React.FC = () => {
  const [randomPokemon, setRandomPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRandomPokemon = async () => {
      try {
        setLoading(true);
        const pokemons = await fetchRandomPokemons(1); // Fetch one random Pokémon
        setRandomPokemon(pokemons[0]);
      } catch (err) {
        setError("Failed to fetch a random Pokémon.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getRandomPokemon();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {randomPokemon && (
        <div
          style={{
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h2>{randomPokemon.name.toUpperCase()}</h2>
          <img
            src={randomPokemon.sprites.front_default}
            alt={randomPokemon.name}
            style={{ width: "150px", height: "150px" }}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;