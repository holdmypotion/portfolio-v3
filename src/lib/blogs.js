import {
  getMarkdownContent,
  getAllMarkdownFiles,
  markdownToHtml,
} from './markdown';

export function getAllBlogs(includeDrafts = false) {
  const slugs = getAllMarkdownFiles('blogs');
  const blogs = slugs.map((slug) => {
    try {
      const { frontmatter } = getMarkdownContent('blogs', slug);
      return {
        slug: frontmatter.slug || slug,
        filename: slug,
        title: frontmatter.title || 'Untitled',
        date: frontmatter.date || new Date().toISOString(),
        tags: frontmatter.tags || [],
        ...frontmatter,
      };
    } catch (error) {
      console.error(`Error parsing blog file: ${slug}`, error);
      return {
        slug,
        filename: slug,
        title: 'Untitled',
        date: new Date().toISOString(),
        tags: [],
        publish_status: 'draft',
      };
    }
  });

  // Filter by publish_status unless includeDrafts is true
  const filteredBlogs = includeDrafts
    ? blogs
    : blogs.filter((blog) => {
        // Default to 'published' if publish_status is not specified (backward compatibility)
        const publishStatus = blog.publish_status || 'published';
        return publishStatus === 'published';
      });

  // Sort blogs by date (newest first)
  return filteredBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getBlogBySlug(slug, includeDrafts = false) {
  // First, try to find the blog by frontmatter slug
  const allSlugs = getAllMarkdownFiles('blogs');
  let filename = null;

  // Look for a file whose frontmatter matches the requested slug
  for (const fileSlug of allSlugs) {
    try {
      const { frontmatter } = getMarkdownContent('blogs', fileSlug);
      if (frontmatter.slug === slug || fileSlug === slug) {
        // Check publish_status unless includeDrafts is true
        if (!includeDrafts) {
          const publishStatus = frontmatter.publish_status || 'published';
          if (publishStatus !== 'published') {
            continue; // Skip this blog if it's not published
          }
        }
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

export function getBlogTags(includeDrafts = false) {
  const blogs = getAllBlogs(includeDrafts);
  const allTags = blogs.flatMap((blog) => blog.tags || []);
  return [...new Set(allTags)];
}

// Helper function to get all blogs including drafts (useful for admin/preview)
export function getAllBlogsIncludingDrafts() {
  return getAllBlogs(true);
}
