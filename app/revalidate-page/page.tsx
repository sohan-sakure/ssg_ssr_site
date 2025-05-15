"use client";

import { useState } from "react";

export default function RevalidatePage() {
    const [path, setPath] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleRevalidate = async () => {
        setStatus("idle");
        setMessage("");

        try {
            const response = await fetch("/api/blog/revalidate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path }),
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
            <button
                onClick={handleRevalidate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Revalidate
            </button>
            {status === "success" && (
                <p className="text-green-600 mt-4">{message}</p>
            )}
            {status === "error" && (
                <p className="text-red-600 mt-4">{message}</p>
            )}
        </div>
    );
}
