"use client";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import PokemonCard from "../components/PokemonCard";

const ITEMS_PER_PAGE = 20;

interface Pokemon {
  name: string;
  url: string;
  likes: number;
}

const HomePage = () => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [displayedPokemon, setDisplayedPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const data = await res.json();

        // Fetch all likes at once
        const likesRes = await fetch("/api/likes/all");
        if (!likesRes.ok) {
          throw new Error("Failed to fetch likes");
        }
        const likesData = await likesRes.json();

        const pokemonWithLikes = data.results.map((pokemon: Pokemon) => ({
          ...pokemon,
          likes: likesData[pokemon.name] || 0,
        }));

        // Sort by likes (descending) and then by name
        const sortedPokemon = pokemonWithLikes.sort(
          (a: Pokemon, b: Pokemon) => {
            if (b.likes !== a.likes) {
              return b.likes - a.likes;
            }
            return a.name.localeCompare(b.name);
          }
        );

        setAllPokemon(sortedPokemon);
        setDisplayedPokemon(sortedPokemon.slice(0, ITEMS_PER_PAGE));
        setTotalCount(sortedPokemon.length);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  useEffect(() => {
    const filtered = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setTotalCount(filtered.length);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    setDisplayedPokemon(
      filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    );
  }, [searchQuery, currentPage, allPokemon]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto p-4 h-[100%]">
      <h1 className="text-3xl font-bold text-center mb-6">Whats the best Pokémon?</h1>
      <p className="text-center mb-6">Vote for your favourite Pokémon and see how many likes they get</p>

      {/* Integrated Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Pokémon by name"
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {displayedPokemon.map((pokemon) => (
              <div
                key={pokemon.name}
                className="relative group cursor-pointer transition-transform hover:scale-105"
              >
                <PokemonCard name={pokemon.name} url={pokemon.url} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
