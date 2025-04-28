"use client";
import React, { useState } from "react";
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
 * Features a like button in the upper right corner.
 *
 * Props:
 * - name: Pokémon's name.
 * - url: API URL for the Pokémon's details.
 */
const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => {
  const [isLiked, setIsLiked] = useState(false);
  const pokemonId = url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the like button
    setIsLiked(!isLiked);
  };

  return (
    <Link href={`/pokemon/${name}`}>
      <div className="relative border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-lg hover:scale-102 transition-transform duration-200 ease-in-out">
        <button
          onClick={handleLikeClick}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FiHeart
            className={`w-5 h-5 ${
              isLiked ? "fill-red-500 stroke-red-500" : "stroke-gray-400"
            }`}
          />
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
