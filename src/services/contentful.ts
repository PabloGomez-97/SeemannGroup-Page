import { createClient, Entry, Asset } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// Interface para los campos del blog post
export interface BlogPostFields {
  title: string;
  slug: string;
  author?: string;
  publishDate: string;
  featuredImage?: Asset;
  excerpt?: string;
  content: Document;
  category?: string;
}

// Tipo Entry con campos tipados
export type BlogPostEntry = Entry<{
  fields: BlogPostFields;
  contentTypeId: 'blog1';
}>;

// Variable para almacenar el cliente
let client: ReturnType<typeof createClient> | null = null;
let clientInitialized = false;

// Función para obtener o crear el cliente
const getClient = () => {
  if (clientInitialized) {
    return client;
  }

  clientInitialized = true;

  try {
    const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
    const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
    
    if (!spaceId || !accessToken || spaceId.trim() === '' || accessToken.trim() === '') {
      console.info('ℹ️ Contentful credentials not configured. Blog features disabled.');
      return null;
    }

    client = createClient({
      space: spaceId,
      accessToken: accessToken,
      environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
    });

    return client;
  } catch (error) {
    console.error('❌ Error initializing Contentful:', error);
    return null;
  }
};

// Obtener todos los posts del blog
export const getBlogPosts = async (limit = 10): Promise<any[]> => {
  const contentfulClient = getClient();
  
  if (!contentfulClient) {
    return [];
  }
  
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'blog1',
      order: ['-fields.publishDate'],
      limit,
    });
    
    return response.items;
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error);
    return [];
  }
};

// Obtener un post específico por slug
export const getBlogPostBySlug = async (slug: string): Promise<any | null> => {
  const contentfulClient = getClient();
  
  if (!contentfulClient) {
    return null;
  }
  
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'blog1',
      'fields.slug': slug,
      limit: 1,
    });
    return response.items[0] || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

// Obtener posts recientes para widget
export const getRecentPosts = async (limit = 3): Promise<any[]> => {
  return getBlogPosts(limit);
};
