import BlogForm from '@/app/components/BlogForm';

export default function CreatePost() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="flex justify-center items-center py-4 text-2xl font-bold mb-4">Create New Blog Post</h1>
            <BlogForm />
        </div>
    );
}