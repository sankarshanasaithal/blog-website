'use client';

import { useState, useEffect } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            onSearch(query);
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [query, onSearch]);

    return (
        <input
            type="text"
            placeholder="Search blogs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4 bg-gray-300 text-black border-black border-opacity-35"
        />
    );
}