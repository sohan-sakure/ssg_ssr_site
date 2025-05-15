import { Suspense } from "react";

type SearchResultItem = {
    id?: string | number;
    title?: string;
    [key: string]: unknown;
};

const ResultsPageContent = async ({ query }: { query: string }) => {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const result = await fetch(`${baseUrl}/api/search?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });
    const data = await result.json();

    return (
        <div>
            <h1>Search Results</h1>
            <p>Results for: {query}</p>
            {/* Fetch and display search results */}
            <ul>
                {Array.isArray(data.results) && data.results.length > 0 ? (
                    data.results.map((item: SearchResultItem, idx: number) => (
                        <li key={item.id ?? idx}>{item.title ?? JSON.stringify(item)}</li>
                    ))
                ) : (
                    <li>No results found.</li>
                )}
            </ul>
        </div >
    );
};
// This is a server component
// It will be rendered on the server and sent to the client
// The client will not see the server component
// Accept searchParams as argument for server component
async function ResultsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { query } = await searchParams;
    const query1 = typeof query === "string" ? query : "";
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultsPageContent query={query1} />
        </Suspense>
    );
}

export default ResultsPage;