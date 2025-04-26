"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchPokemonDetails } from "../../api/services/pokemonApi";

export default function PokemonPage() {
  const { name } = useParams(); // Access the Pokémon name from the dynamic route
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true);
      try {
        const data = await fetchPokemonDetails(name as string);
        setPokemon(data);
      } catch (err) {
        console.error("Failed to load Pokémon:", err);
        setError("Could not load this Pokémon's information.");
      } finally {
        setLoading(false);
      }
    }

    if (name) {
      loadPokemon();
    }
  }, [name]);

  if (loading) {
    return (
      <div className="text-center text-gray-700">
        Loading Pokémon details...
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="text-center text-red-500">
        <p>Oops! Something went wrong.</p>
        <p>{error || "Pokémon not found!"}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center capitalize mb-6">
        {pokemon.name}
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={pokemon.sprites}
          alt={pokemon.name}
          className="w-48 h-48 object-contain mx-auto"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>ID:</strong> {pokemon.id}
            </li>
            <li>
              <strong>Base Experience:</strong> {pokemon.base_experience}
            </li>
            <li>
              <strong>Height:</strong> {pokemon.height}
            </li>
            <li>
              <strong>Weight:</strong> {pokemon.weight}
            </li>
            <li>
              <strong>Types:</strong> {pokemon.types.join(", ")}
            </li>
            <li>
              <strong>Abilities:</strong> {pokemon.abilities.join(", ")}
            </li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Stats</h2>
          <ul className="list-disc list-inside space-y-2">
            {pokemon.stats.map((stat: any) => (
              <li key={stat.name}>
                <strong>{stat.name}:</strong> {stat.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
