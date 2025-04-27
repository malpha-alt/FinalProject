"use client";
import React from "react";

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
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Search Pokémon by name"
                className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default SearchBar;