import { NextResponse } from 'next/server';
import { posts } from '@/app/lib/store';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const post = posts.find(p => p.id === id);

    if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        const index = posts.findIndex(p => p.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        posts[index] = { ...posts[index], ...body };
        return NextResponse.json(posts[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const index = posts.findIndex(p => p.id === id);

    if (index === -1) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    posts.splice(index, 1);
    return NextResponse.json({ message: 'Post deleted' });
}