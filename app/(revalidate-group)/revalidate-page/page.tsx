"use client";

import { RevalidateRequestBody } from "@/utils/helper";
import { useState } from "react";

export default function RevalidatePage() {
    const [path, setPath] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [includeSiblings, setIncludeSiblings] = useState(false);
    const [includeAll, setIncludeAll] = useState(false);
    const [specificPage, setSpecificPage] = useState(false);
    const [message, setMessage] = useState("");

    const handleRevalidate = async () => {
        setStatus("idle");
        setMessage("");

        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            const response = await fetch(`${baseUrl}/api/revalidate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path, includeSiblings: includeSiblings, includeAll: includeAll } as RevalidateRequestBody),
            });

            if (response.ok) {
                setStatus("success");
                setMessage("Revalidation succeeded!");
            } else {
                const errorData = await response.json();
                setStatus("error");
                setMessage(errorData.error || "Revalidation failed.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("An unexpected error occurred. ");
            console.error("Revalidation error:", error);
        }
    };

    return (
        <div className="py-4">
            <h1 className="font-extrabold text-2xl mb-4">Revalidate Page</h1>

            <div className="mb-4">
                <fieldset>
                    <legend className="font-medium mb-2">Revalidate Options</legend>
                    {[
                        { label: "Blog pages", value: "siblings" },
                        { label: "All pages", value: "all" },
                        { label: "Specific page path", value: "specific" },
                    ].map((option) => (
                        <label key={option.value} className="inline-flex items-center mr-6">
                            <input
                                type="radio"
                                name="revalidate-option"
                                value={option.value}
                                checked={
                                    (option.value === "siblings" && includeSiblings) ||
                                    (option.value === "all" && includeAll) ||
                                    (option.value === "specific" && specificPage)
                                }
                                onChange={() => {
                                    setIncludeSiblings(option.value === "siblings");
                                    setIncludeAll(option.value === "all");
                                    setSpecificPage(option.value === "specific");
                                }}
                                className="mr-2"
                            />
                            {option.label}
                        </label>
                    ))}
                </fieldset>
            </div>
            {specificPage && (
                <div className="mb-4">
                    <label htmlFor="path" className="block font-medium mb-2">
                        Path to Revalidate:
                    </label>
                    <input
                        id="path"
                        type="text"
                        value={path}
                        onChange={(e) => setPath(e.target.value)}
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                        placeholder="/your-path"
                    />
                </div>
            )}
            <div className="my-4">
                <button
                    onClick={handleRevalidate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Revalidate
                </button>
            </div>
            {(status === "success" || status === "error") && (
                <p
                    className={`mt-4 ${status === "success" ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {message}
                </p>
            )}

            {/* Hide message after 5 seconds */}
            {(() => {
                if (status === "success" || status === "error") {
                    setTimeout(() => {
                        setStatus("idle");
                        setMessage("");
                    }, 5000);
                }
                return null;
            })()}
        </div>

    );
}
