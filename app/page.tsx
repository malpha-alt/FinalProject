"use client";
import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
const ITEMS_PER_PAGE = 20;

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`);
        const data = await res.json();
        setPokemonList(data.results); // Only 20 Pokémon now
        setTotalCount(data.count);    // Total available Pokémon (for pagination)

        const likesPromises = data.results.map(async (pokemon: { name: string }) => {
          const res = await fetch(`/api/likes?name=${pokemon.name}`);
          const likeData = await res.json();
          return { name: pokemon.name, likes: likeData.likes || 0 };
        });

        const allLikes = await Promise.all(likesPromises);
        const likesObject: { [name: string]: number } = {};
        const likedObject: { [name: string]: boolean } = {};

        allLikes.forEach(({ name, likes }) => {
          likesObject[name] = likes;
          likedObject[name] = likes > 0;
        });


      } catch (error) {
        console.error("Error fetching Pokémon list or likes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]); // Fetch whenever page changes

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto p-4 h-[100%]">
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon List</h1>

      <SearchBar value={searchQuery} onChange={handleSearchChange} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {filteredPokemon.map((pokemon) => (
              <div
                key={pokemon.name}
                className="relative group cursor-pointer transition-transform hover:scale-105"
              >
                <PokemonCard name={pokemon.name} url={pokemon.url} />
                
                  
              </div>
            ))}
          </div>

          {/* Pagination controls */}
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
