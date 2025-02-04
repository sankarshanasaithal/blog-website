import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-blue-950 shadow-lg p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-xl font-bold">
                    Blog Website
                </Link>
                <Link
                    href="/posts/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create Blog
                </Link>
            </div>
        </nav>
    );
}