import { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
    const response = await fetch('https://dev.to/api/articles');
    const blogs = await response.json();

    return blogs.slice(0, 10).map((blog: { id: number }) => ({
        id: blog.id.toString(), // Ensure id is a string
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const response = await fetch(`https://dev.to/api/articles/${id}`);
    const blog = await response.json();

    return {
        title: blog.title,
    };
}

// type tParams = Promise<{ id: string }>;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    // Ensure params is treated as a plain object
    const { id } = await params;
    const response = await fetch(`https://dev.to/api/articles/${id}`);
    const blog = await response.json();

    return (
        <div className="p-8">
            <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
            <h1 className="font-extrabold text-2xl mt-4">{blog.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: blog.body_html }} className="mt-4" />
        </div>
    );
}

