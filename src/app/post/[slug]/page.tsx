import { getPostBySlug } from '@/lib/headlesswp';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PostPageProps) {
  try {
    const post = await getPostBySlug(params.slug);
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <article className="bg-white rounded-lg shadow-md p-6">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
            <div className="flex items-center text-gray-600">
              <span className="mr-4">
                By {post.author.node.name}
              </span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </header>

          {post.featuredImage?.node?.sourceUrl && (
            <div className="mb-8">
              <img
                src={post.featuredImage.node.sourceUrl}
                alt={post.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
} 