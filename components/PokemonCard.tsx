"use client";
import React from "react";
import Link from "next/link";

interface PokemonCardProps {
  name: string;
  url: string;
}

/**
 * PokemonCard Component
 * Created by Gabriel Levi Carneiro Ramos
 *
 * Displays a Pokémon's name and image, and links to its details page.
 *
 * Props:
 * - name: Pokémon's name.
 * - url: API URL for the Pokémon's details.
 */
const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => {
  const pokemonId = url.split("/").filter(Boolean).pop(); // Extract ID from URL
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <Link href={`/pokemon/${name}`}>
      <div className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-lg hover:scale-102 transition-transform duration-200 ease-in-out">
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
