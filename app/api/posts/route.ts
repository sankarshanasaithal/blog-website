import { NextResponse } from 'next/server';
import { BlogPost } from '@/app/lib/types';

let posts: BlogPost[] = [
    {
        id: '1',
        title: 'Getting Started with Next.js',
        author: 'John Doe',
        content: 'Next.js is a powerful framework...',
        createdAt: new Date().toISOString(),
    },
    // Add more sample posts
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search') || '';
    const perPage = 5;

    let filteredPosts = posts;
    if (search) {
        filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    const start = (page - 1) * perPage;
    const paginatedPosts = filteredPosts.slice(start, start + perPage);
    const totalPages = Math.ceil(filteredPosts.length / perPage);

    return NextResponse.json({
        posts: paginatedPosts,
        totalPages,
        currentPage: page,
    });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newPost: BlogPost = {
            id: Date.now().toString(),
            title: body.title,
            author: body.author,
            content: body.content,
            createdAt: new Date().toISOString(),
        };

        posts.unshift(newPost);
        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create post' },
            { status: 500 }
        );
    }
}