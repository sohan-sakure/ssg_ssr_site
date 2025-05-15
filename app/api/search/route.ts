import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("query") || "";

  const mockData = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Searchable Item" },
  ];

  const results = mockData.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json({ results });
}

