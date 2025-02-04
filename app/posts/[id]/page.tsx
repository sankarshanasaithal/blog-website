'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/app/lib/types';
import BlogForm from '@/app/components/BlogForm';
import DeleteModal from '@/app/components/DeleteModel';

export default function PostPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/posts/${params.id}`);
                if (!response.ok) {
                    throw new Error('Post not found');
                }
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
                router.push('/');
            }
        };

        fetchPost();
    }, [params.id, router]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/posts/${params.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    if (!post) {
        return <div className='flex font-bold text-lg items-center justify-center h-32'>Loading...</div>;
    }

    return (
        <div className="min-h-[calc(100vh-20rem)] flex flex-col justify-center mx-auto p-4 max-w-4xl">
            {isEditing ? (
                <BlogForm initialData={post} isEditing={true} />
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-black">By {post.author}</p>
                        <p className="text-black">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="prose max-w-none mb-8">
                        {post.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Edit Post
                        </button>
                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Delete Post
                        </button>
                    </div>
                </>
            )}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
}