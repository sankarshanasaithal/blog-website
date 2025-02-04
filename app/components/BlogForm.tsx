'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/app/lib/types';

interface BlogFormProps {
    initialData?: BlogPost;
    isEditing?: boolean;
}

export default function BlogForm({
    initialData,
    isEditing = false,
}: BlogFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        author: initialData?.author || '',
        content: initialData?.content || '',
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const url = isEditing
                ? `/api/posts/${initialData?.id}`
                : '/api/posts';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            router.push(`/posts/${data.id}`);
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save post');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-[#365282] border-none rounded-xl shadow-2xl shadow-gray-800">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <div className="mb-4">
                <label className="block mb-2 text-white font-semibold">Title</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full p-2 border rounded text-black bg-gray-300"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-white font-semibold">Author</label>
                <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                    }
                    className="w-full p-2 border rounded text-black bg-gray-300"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-white font-semibold">Content</label>
                <textarea
                    value={formData.content}
                    onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                    }
                    className="w-full p-2 border rounded h-48 text-black bg-gray-300"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {isSubmitting
                    ? 'Saving...'
                    : isEditing
                        ? 'Update Post'
                        : 'Create Post'}
            </button>
        </form>
    );
}