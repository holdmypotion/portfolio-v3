import {
  getMarkdownContent,
  getAllMarkdownFiles,
  markdownToHtml,
} from './markdown';

export function getAllBlogs() {
  const slugs = getAllMarkdownFiles('blogs');
  const blogs = slugs.map((slug) => {
    const { frontmatter } = getMarkdownContent('blogs', slug);
    return {
      slug: frontmatter.slug || slug, // Use frontmatter slug if available, fallback to filename
      filename: slug, // Keep track of the actual filename
      ...frontmatter,
    };
  });

  // Sort blogs by date (newest first)
  return blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getBlogBySlug(slug) {
  // First, try to find the blog by frontmatter slug
  const allSlugs = getAllMarkdownFiles('blogs');
  let filename = null;

  // Look for a file whose frontmatter matches the requested slug
  for (const fileSlug of allSlugs) {
    try {
      const { frontmatter } = getMarkdownContent('blogs', fileSlug);
      if (frontmatter.slug === slug || fileSlug === slug) {
        filename = fileSlug;
        break;
      }
    } catch (error) {
      continue;
    }
  }

  if (!filename) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }

  const { frontmatter, content } = getMarkdownContent('blogs', filename);
  const htmlContent = await markdownToHtml(content);

  return {
    slug: frontmatter.slug || filename,
    frontmatter,
    content: htmlContent,
  };
}

export function getBlogTags() {
  const blogs = getAllBlogs();
  const allTags = blogs.flatMap((blog) => blog.tags || []);
  return [...new Set(allTags)];
}
