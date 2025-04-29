"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";

interface PokemonCardProps {
  name: string;
  url: string;
}

/**
 * PokemonCard Component
 * Created by Gabriel Levi Carneiro Ramos
 *
 * Displays a Pokémon's name and image, and links to its details page.
 * Features a like button in the upper right corner that only adds likes.
 *
 * Props:
 * - name: Pokémon's name.
 * - url: API URL for the Pokémon's details.
 */
const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => {
  const [likes, setLikes] = useState<number>(0);
  const pokemonId = url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  // Load likes from API
  useEffect(() => {
    async function fetchLikes() {
      try {
        const res = await fetch(`/api/likes?name=${name}`);
        if (!res.ok) throw new Error("Failed to fetch likes");
        const data = await res.json();
        setLikes(data.likes || 0);
      } catch (error) {
        console.error("Error fetching likes:", error);
        setLikes(0);
      }
    }
    fetchLikes();
  }, [name]);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the like button
    try {
      const res = await fetch(`/api/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Failed to update likes");

      const data = await res.json();
      setLikes(data.likes || 0);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <Link href={`/pokemon/${name}`}>
      <div className="relative border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-lg hover:scale-102 transition-transform duration-200 ease-in-out">
        <button
          onClick={handleLikeClick}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-1"
        >
          <FiHeart className="w-5 h-5 fill-red-500 stroke-red-500" />
          <span className="text-sm">{likes}</span>
        </button>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-24 object-contain mb-2"
        />
        <h2 className="text-lg font-medium text-center capitalize">{name}</h2>
      </div>
    </Link>
  );
};

export default PokemonCard;
