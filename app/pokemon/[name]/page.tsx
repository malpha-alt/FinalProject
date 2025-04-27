"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchPokemonDetails } from "../../api/services/pokemonApi";

const statColors: { [key: string]: string } = {
  fire: "bg-red-800",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  psychic: "bg-purple-500",
  fairy: "bg-pink-500",
  normal: "bg-gray-300",
  fighting: "bg-orange-500",
  flying: "bg-indigo-300",
  poison: "bg-purple-800",
  ground: "bg-yellow-800",
  rock: "bg-yellow-600",
  bug: "bg-green-400",
  ghost: "bg-indigo-800",
  steel: "bg-gray-500",
  dragon: "bg-blue-800",
  dark: "bg-gray-800",
  ice: "bg-cyan-400",


};
const textColors: { [key: string]: string } = {
  fire: "text-red-700",
  water: "text-blue-700",
  grass: "text-green-800",
  electric: "text-yellow-500",
  psychic: "text-purple-600",
  fairy: "text-pink-700",
  normal: "text-gray-600",
  fighting: "text-orange-700",
  flying: "text-indigo-500",
  poison: "text-purple-900",
  ground: "text-yellow-900",
  rock: "text-yellow-600",
  bug: "text-green-500",
  ghost: "text-indigo-800",
  steel: "text-gray-700",
  dragon: "text-blue-900",
  dark: "text-gray-900",
  ice: "text-cyan-800",
};

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

  const primaryType = pokemon.types[0]?.toLowerCase();
  const secondaryType = pokemon.types[1]?.toLowerCase();

  // Use the secondary pokemon type if available, or use primary type (Julian Shyu)
  const pokemonType = secondaryType || primaryType;

  const typeClass = statColors[pokemonType] || "bg-gray-400";
  const textColorClass = textColors[primaryType] || "text-gray-800";
  return (
    <div className={`container mx-auto p-4 rounded-lg shadow-lg`}>
      <h1 className={`text-3xl font-bold text-center capitalize mb-6 ${textColorClass}`}>
        {pokemon.name}
      </h1>
      <div className={`flex flex-col md:flex-row items-center md:items-start gap-6 ${textColorClass}`}>
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
            <div key={stat.name}>
                <strong>{stat.name}:</strong> {stat.value}
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div
                    className={`${typeClass} h-4 rounded-full`}
                    style={{ width: `${stat.value/255*100}%` }}
                />
              </div>
            </div>

            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
