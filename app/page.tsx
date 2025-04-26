"use client";
import React, { useEffect, useState } from "react";
import { fetchPokemonList } from "./api/services/pokemonApi";
import PokemonCard from "../components/PokemonCard";

/**
 * HomePage Component
 * Created by Gabriel Levi Carneiro Ramos
 *
 * This component displays a list of Pokémon fetched from the API.
 * It includes a search bar to filter Pokémon by name and renders each Pokémon as a card.
 */
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
      {/* TODO: make this into a workable component then import instead */}
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
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
