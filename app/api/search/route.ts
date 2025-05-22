import { SearchResultItem } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("query") || "";

  const mockData: SearchResultItem[] = [
    { id: 1, title: "Item 1", category: "Books", price: 10.99, inStock: true },
    {
      id: 2,
      title: "Item 2",
      category: "Electronics",
      price: 199.99,
      inStock: false,
    },
    {
      id: 3,
      title: "Searchable Item",
      category: "Books",
      price: 15.5,
      inStock: true,
    },
    {
      id: 4,
      title: "Gadget Pro",
      category: "Electronics",
      price: 299.99,
      inStock: true,
    },
    {
      id: 5,
      title: "Kitchen Set",
      category: "Home",
      price: 49.99,
      inStock: false,
    },
    {
      id: 6,
      title: "Notebook",
      category: "Stationery",
      price: 2.99,
      inStock: true,
    },
    { id: 7, title: "Lamp", category: "Home", price: 25.0, inStock: true },
    {
      id: 8,
      title: "Wireless Mouse",
      category: "Electronics",
      price: 29.99,
      inStock: true,
    },
    {
      id: 9,
      title: "Pen Set",
      category: "Stationery",
      price: 5.49,
      inStock: false,
    },
    {
      id: 10,
      title: "Cookbook",
      category: "Books",
      price: 20.0,
      inStock: true,
    },
  ];

  const results = mockData.filter((item: SearchResultItem) => {
    const queryLower = query.toLowerCase();
    return (
      (item?.title && item.title.toLowerCase().includes(queryLower)) ||
      (item?.category && item.category.toLowerCase().includes(queryLower)) ||
      (item?.price !== undefined &&
        item.price.toString().toLowerCase().includes(queryLower)) ||
      (item?.inStock !== undefined &&
        item.inStock.toString().toLowerCase().includes(queryLower))
    );
  });

  return NextResponse.json({ results });
}

