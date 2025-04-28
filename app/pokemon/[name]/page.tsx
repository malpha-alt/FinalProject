"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FiHeart } from "react-icons/fi";
import { fetchPokemonDetails } from "../../api/services/pokemonApi";

// Updated color scheme for dark mode
const statColors: { [key: string]: string } = {
  fire: "bg-red-600",
  water: "bg-blue-600",
  grass: "bg-green-600",
  electric: "bg-yellow-500",
  psychic: "bg-purple-600",
  fairy: "bg-pink-600",
  normal: "bg-gray-500",
  fighting: "bg-orange-600",
  flying: "bg-indigo-500",
  poison: "bg-purple-700",
  ground: "bg-amber-700",
  rock: "bg-yellow-700",
  bug: "bg-lime-600",
  ghost: "bg-violet-700",
  steel: "bg-slate-600",
  dragon: "bg-blue-700",
  dark: "bg-neutral-700",
  ice: "bg-cyan-600",
};

const textColors: { [key: string]: string } = {
  fire: "text-red-400",
  water: "text-blue-400",
  grass: "text-green-400",
  electric: "text-yellow-400",
  psychic: "text-purple-400",
  fairy: "text-pink-400",
  normal: "text-gray-400",
  fighting: "text-orange-400",
  flying: "text-indigo-400",
  poison: "text-purple-400",
  ground: "text-amber-400",
  rock: "text-yellow-400",
  bug: "text-lime-400",
  ghost: "text-violet-400",
  steel: "text-slate-400",
  dragon: "text-blue-400",
  dark: "text-neutral-400",
  ice: "text-cyan-400",
};

export default function PokemonPage() {
  const { name } = useParams(); // Access the Pokémon name from the dynamic route
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

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
    <div className="container mx-auto p-4 h-[120vh]">
      <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl shadow-xl overflow-hidden relative">
        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 transition-colors z-10"
        >
          <FiHeart
            className={`w-6 h-6 ${
              isLiked ? "fill-red-500 stroke-red-500" : "stroke-gray-400"
            }`}
          />
        </button>

        {/* Header with gradient background */}
        <div className={`p-6 ${textColorClass}`}>
          <h1 className="text-4xl font-bold text-center capitalize mb-6">
            {pokemon.name}
          </h1>
        </div>

        <div className="p-6 bg-gray-900">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image Section */}
            <div className="md:w-1/3">
              <div className="bg-gray-800 rounded-xl p-6">
                <img
                  src={pokemon.sprites}
                  alt={pokemon.name}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-2/3 text-gray-300">
              <div className="bg-gray-800 rounded-xl p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>ID:</strong> #{pokemon.id}
                  </div>
                  <div>
                    <strong>Base XP:</strong> {pokemon.base_experience}
                  </div>
                  <div>
                    <strong>Height:</strong> {pokemon.height / 10}m
                  </div>
                  <div>
                    <strong>Weight:</strong> {pokemon.weight / 10}kg
                  </div>
                </div>
                <div className="mt-4">
                  <strong>Types:</strong>
                  <div className="flex gap-2 mt-2">
                    {pokemon.types.map((type: string) => (
                      <span
                        key={type}
                        className={`${
                          statColors[type.toLowerCase()]
                        } px-3 py-1 rounded-full text-white text-sm`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4">Stats</h2>
                <div className="space-y-4">
                  {pokemon.stats.map((stat: any) => (
                    <div key={stat.name}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize">{stat.name}</span>
                        <span>{stat.value}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`${typeClass} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${(stat.value / 255) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
