import { BlogPost } from './types';

export let posts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    author: 'John Doe',
    content: 'Next.js is a powerful framework...',
    createdAt: new Date().toISOString(),
  },
];