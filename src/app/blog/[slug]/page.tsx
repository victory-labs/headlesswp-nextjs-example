import { getPostBySlug } from 'headlesswp';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  console.log('Fetching post with slug:', params.slug);
  console.log('WordPress URL:', process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL);
  
  const post = await getPostBySlug(params.slug);
  console.log('Post data:', post);

  if (!post) {
    console.log('Post not found');
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <article className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
          
          {post.featuredImage?.node?.sourceUrl && (
            <img
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Published on {new Date(post.date).toLocaleDateString()}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
} 