import { useEffect, useState } from 'react';

type Result = {
    id: string | number;
    name: string;
    // add other properties if needed
};
interface SearchResultsProps {
    query: string;
}

const SearchResults = ({ query }: SearchResultsProps) => {

    const [results, setResults] = useState<Result[]>([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        if (query) {
            fetch(`/api/search?query=${query}`)
                .then((res) => res.json())
                .then((data) => setResults(data.results));
            console.log(results);
        }
    }, [query]);

    const filteredResults = results.filter((result) =>
        result.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <h1>Search Results</h1>
            <input
                type="text"
                placeholder="Filter results..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <ul>
                {filteredResults.map((result) => (
                    <li key={result.id}>{result.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
