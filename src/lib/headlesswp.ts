import HeadlessWPSDK from 'headlesswp-sdk';
import { Post, Page, Menu } from 'headlesswp-sdk/src/types/content';

const graphqlUrl = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL;

if (!graphqlUrl) {
  throw new Error('NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL is not defined');
}

console.log('WordPress Configuration:');
console.log('GraphQL URL:', graphqlUrl);
console.log('Auth Token:', process.env.NEXT_PUBLIC_WORDPRESS_AUTH_TOKEN ? 'Present' : 'Not Present');

// Initialize the WordPress SDK with GraphQL configuration
const wp = new HeadlessWPSDK({
  graphqlUrl,
  authToken: process.env.NEXT_PUBLIC_WORDPRESS_AUTH_TOKEN,
  revalidate: 3600, // 1 hour
});

// Posts
export async function getPosts(): Promise<Post[]> {
  console.log('Fetching posts...');
  try {
    return await wp.getAllPosts();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function getPostBySlug(slug: string): Promise<Post> {
  return wp.getPostBySlug(slug);
}

// Pages
export async function getPages(): Promise<Page[]> {
  return wp.getAllPages();
}

export async function getPageBySlug(slug: string): Promise<Page> {
  return wp.getPageBySlug(slug);
}

// Menus
export async function getMenuBySlug(slug: string): Promise<Menu> {
  return wp.getMenuBySlug(slug);
}

// Search
export async function search(query: string) {
  return wp.search(query);
}

// Comments
export async function createComment(input: {
  postId: string;
  author: string;
  content: string;
  email: string;
}) {
  return wp.createComment(input);
}

export default wp; 