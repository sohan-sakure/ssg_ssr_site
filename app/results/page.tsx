import { SearchResultItem } from "@/types";
import { Suspense } from "react";



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
    console.log("Search results:", data);

    return (
        <div className="my-20">
            <h1 className="font-bold mb-10">Search Results</h1>
            <p>Results for: {query}</p>
            {/* Fetch and display search results */}
            {Array.isArray(data.results) && data.results.length > 0 ? (
                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                {/* Replace these with actual property names from SearchResultItem except 'id' */}
                                {Object.keys(data.results[0])
                                    .filter((key) => key !== "id")
                                    .map((key) => (
                                        <th key={key} className="px-4 py-2 border-b text-left font-semibold">
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.results.map((item: SearchResultItem, idx: number) => (
                                <tr key={item.id ?? idx} className="hover:bg-gray-50">
                                    {Object.entries(item)
                                        .filter(([key]) => key !== "id")
                                        .map(([key, value]) => (
                                            <td key={key} className="px-4 py-2 border-b">
                                                {typeof value === "object" && value !== null
                                                    ? JSON.stringify(value)
                                                    : String(value)}
                                            </td>
                                        ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="mt-6 text-gray-500">No results found.</div>
            )}
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