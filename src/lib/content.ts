import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export interface Page {
  title: string;
  excerpt?: string;
  hero_image?: string;
  content: string;
  body: {
    html: string;
  };
  _raw: {
    sourceFileName: string;
  };
}

export interface Post {
  title: string;
  date: string;
  excerpt?: string;
  content: string;
  body: {
    html: string;
  };
  slug: string;
  _id: string;
}

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export async function getAllPages(): Promise<Page[]> {
  const pagesDirectory = path.join(contentDirectory, 'pages');
  if (!fs.existsSync(pagesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(pagesDirectory);
  
  const pages = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const fullPath = path.join(pagesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const htmlContent = await markdownToHtml(content);
        
        return {
          title: data.title || 'Untitled',
          excerpt: data.excerpt,
          hero_image: data.hero_image,
          content,
          body: {
            html: htmlContent
          },
          _raw: {
            sourceFileName: fileName
          }
        };
      })
  );
  
  return pages;
}

export async function getAllPosts(): Promise<Post[]> {
  const postsDirectory = path.join(contentDirectory, 'posts');
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  
  const posts = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const slug = fileName.replace(/\.md$/, '');
        const htmlContent = await markdownToHtml(content);
        
        return {
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt,
          content,
          body: {
            html: htmlContent
          },
          slug,
          _id: slug
        };
      })
  );
  
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}