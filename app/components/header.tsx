"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/results?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <header>
            <form onSubmit={handleSearch}>
                <input
                    className="border border-gray-300 rounded p-2"
                    type="text"
                    placeholder="Search blogs..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="ml-4 border-2 px-3 py-1 rounded-md" type="submit">Search</button>
            </form>
        </header>
    );
};

export default Header;
