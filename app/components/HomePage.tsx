'use client';

import { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { BlogPost } from '../lib/types';

export default function HomePage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchPosts = async () => {
        try {
            const response = await fetch(
                `/api/posts?page=${currentPage}&search=${searchQuery}`
            );
            const data = await response.json();
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [currentPage, searchQuery]);

    return (
        <main className="container mx-auto p-4 py-6">
            <SearchBar onSearch={setSearchQuery} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </main>
    );
}