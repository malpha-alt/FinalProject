"use client";
import React from "react";
import { FiSearch } from "react-icons/fi"; // Import the search icon

/**
 * SearchBar Component
 * Created by Julian Shyu
 *
 * Displays the Search Bar and lets it search Pokemon names
 *
 * Props:
 * - value: string — The current text inside the search input.
 * - onChange
 *
 */

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="relative w-full max-w-md">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search Pokémon by name"
          className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default SearchBar;
