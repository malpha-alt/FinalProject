"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPokemonList } from "../api/services/pokemonApi";

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState<
    { name: string; url: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPokemonList(20); // Fetch 20 Pokémon
        setPokemonList(data);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return <div className="text-center text-gray-700">Loading Pokémon...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon List</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search Pokémon by name"
          className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {pokemonList.map((pokemon) => {
          const pokemonId = pokemon.url.split("/").filter(Boolean).pop(); // Extract ID from URL
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

          return (
            <Link key={pokemon.name} href={`/pokemon/${pokemon.name}`}>
              <div className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-lg hover:scale-102 transition-transform duration-200 ease-in-out">
                <img
                  src={imageUrl}
                  alt={pokemon.name}
                  className="w-full h-24 object-contain mb-2"
                />
                <h2 className="text-lg font-medium text-center capitalize">
                  {pokemon.name}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
