import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { path } = req.body;

    try {
      await res.revalidate(path);
      return res.json({ revalidated: true });
    } catch (err) {
      console.log("Error revalidating:", err);
      // If there was an error, Next.js will return a 500 error
      return res.status(500).json({ error: "Failed to revalidate" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}

