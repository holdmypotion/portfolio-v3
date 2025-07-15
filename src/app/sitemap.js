import { getAllBlogs } from '@/lib/blogs';
import { getAllGitHubProjects } from '@/lib/github';

export default async function sitemap() {
  const baseUrl = 'https://www.holdmypotion.tech';

  // Get all blog posts
  const blogs = getAllBlogs();
  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Get all projects from GitHub
  let projectUrls = [];
  try {
    const projects = await getAllGitHubProjects();
    projectUrls = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.updated_at || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error);
    // Continue without project URLs if GitHub API fails
  }

  // Static pages
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  return [...staticUrls, ...blogUrls, ...projectUrls];
}
