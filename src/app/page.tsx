import Link from 'next/link';
import { getPosts } from '@/lib/headlesswp';

export default async function Home() {
    const posts = await getPosts();

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-gray-900">WordPress Posts</h1>
                <div className="grid gap-6">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/post/${post.slug}`}
                            className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                                {post.title}
                            </h2>
                            <div
                                className="text-gray-600 line-clamp-3"
                                dangerouslySetInnerHTML={{__html: post.excerpt}}
                            />
                            {post.featuredImage?.node?.sourceUrl && (
                                <img 
                                    src={post.featuredImage.node.sourceUrl} 
                                    alt={post.title}
                                    className="mt-4 rounded-lg w-full h-48 object-cover"
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
} 