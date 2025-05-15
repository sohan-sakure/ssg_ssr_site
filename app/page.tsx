import Header from "./components/header";
import Link from "next/link";

export default async function Home() {
  const response = await fetch('https://dev.to/api/articles');
  const blogs: { id: string; title: string }[] = await response.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Header />
        <Link className="text-blue-600 hover:underline hover:text-blue-800 transition-colors text-[12px] font-bold " href="./server-rendered">Redirect to Server Rendered Page</Link>
        <h1 className="font-extrabold">Blog List</h1>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link
                className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                href={`/blog/${blog.id}`}
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>

    </div>
  );
}
