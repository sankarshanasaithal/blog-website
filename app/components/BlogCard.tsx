import Link from 'next/link';
import { BlogPost } from '@/app/lib/types';

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/posts/${post.id}`}>
            <div className=" rounded-lg p-4 hover:shadow-2xl transition-shadow bg-blue-500">
                <h2 className="text-gray-200 text-xl font-extrabold mb-2">{post.title}</h2>
                <p className="text-gray-900 mb-2 font-semibold">By {post.author}</p>
                <p className="text-gray-200 font-serif">
                    {post.content.substring(0, 150)}...
                </p>
                <div className="flex justify-between items-center mt-2">
                    <span></span>
                    <p className="text-white font-thin text-sm">
                        {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </Link>
    );
}