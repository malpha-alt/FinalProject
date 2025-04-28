"use client";
import React, { useEffect, useState } from "react";
import { fetchPokemonList } from "./api/services/pokemonApi";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";

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
        const data = await fetchPokemonList(1050); // Fetch Pokémon
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
    <div className="container mx-auto p-4 h-[100vh]">
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon List</h1>

      {/* Search Bar */}
      {/* Made by Julian Shyu */}
      <SearchBar value={searchQuery} onChange={handleSearchChange} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {pokemonList
          .filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((pokemon) => (
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
