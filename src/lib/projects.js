import {
  getMarkdownContent,
  getAllMarkdownFiles,
  markdownToHtml,
} from './markdown';

export function getAllProjects(includeDrafts = false) {
  const slugs = getAllMarkdownFiles('projects');
  const projects = slugs.map((slug) => {
    const { frontmatter } = getMarkdownContent('projects', slug);
    return {
      slug: frontmatter.slug || slug, // Use frontmatter slug if available, fallback to filename
      filename: slug, // Keep track of the actual filename
      ...frontmatter,
    };
  });

  // Filter by publish_status unless includeDrafts is true
  const filteredProjects = includeDrafts
    ? projects
    : projects.filter((project) => {
        // Default to 'published' if publish_status is not specified (backward compatibility)
        const publishStatus = project.publish_status || 'published';
        return publishStatus === 'published';
      });

  // Sort projects by featured status, then by status
  return filteredProjects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    const statusOrder = { production: 0, active: 1, archived: 2 };
    return (statusOrder[a.status] || 3) - (statusOrder[b.status] || 3);
  });
}

export async function getProjectBySlug(slug, includeDrafts = false) {
  // First, try to find the project by frontmatter slug
  const allSlugs = getAllMarkdownFiles('projects');
  let filename = null;

  // Look for a file whose frontmatter matches the requested slug
  for (const fileSlug of allSlugs) {
    try {
      const { frontmatter } = getMarkdownContent('projects', fileSlug);
      if (frontmatter.slug === slug || fileSlug === slug) {
        // Check publish_status unless includeDrafts is true
        if (!includeDrafts) {
          const publishStatus = frontmatter.publish_status || 'published';
          if (publishStatus !== 'published') {
            continue; // Skip this project if it's not published
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
    throw new Error(`Project with slug "${slug}" not found`);
  }

  const { frontmatter, content } = getMarkdownContent('projects', filename);
  const htmlContent = await markdownToHtml(content);

  return {
    slug: frontmatter.slug || filename,
    frontmatter,
    content: htmlContent,
  };
}

// Helper function to get all projects including drafts (useful for admin/preview)
export function getAllProjectsIncludingDrafts() {
  return getAllProjects(true);
}
