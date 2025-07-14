import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const systemsDesignDirectory = path.join(
  process.cwd(),
  'content/systems-design',
);

export function getAllSystemsDesignSlugs() {
  try {
    const dirNames = fs.readdirSync(systemsDesignDirectory);
    return dirNames
      .filter((name) => {
        const dirPath = path.join(systemsDesignDirectory, name);
        return fs.statSync(dirPath).isDirectory();
      })
      .filter((dirName) => {
        const dirPath = path.join(systemsDesignDirectory, dirName);
        const files = fs.readdirSync(dirPath);
        const hasExcalidraw = files.some((file) =>
          file.endsWith('.excalidraw'),
        );
        const hasMd = files.some((file) => file.endsWith('.md'));
        return hasExcalidraw || hasMd;
      });
  } catch (error) {
    console.error('Error reading systems design directory:', error);
    return [];
  }
}

export function getSystemsDesignBySlug(slug) {
  try {
    const dirPath = path.join(systemsDesignDirectory, slug);

    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
      throw new Error(`Directory not found: ${slug}`);
    }

    const files = fs.readdirSync(dirPath);
    const excalidrawFile = files.find((file) => file.endsWith('.excalidraw'));
    const mdFile = files.find((file) => file.endsWith('.md'));

    let frontmatter = {};
    let content = '';
    let compressedData = null;

    if (mdFile) {
      const mdPath = path.join(dirPath, mdFile);
      const mdContents = fs.readFileSync(mdPath, 'utf8');

      if (mdContents.trim()) {
        const { data, content: mdContent } = matter(mdContents);
        frontmatter = data;
        content = mdContent;

        const obsidianMatch = content.match(
          /# Excalidraw Data[\s\S]*?\n\n([\s\S]*?)%%/,
        );
        if (obsidianMatch) {
          compressedData = obsidianMatch[1].replace(/\s/g, '');
        } else {
          let jsonMatch = content.match(/```compressed-json\n([\s\S]*?)\n```/);
          if (jsonMatch) {
            compressedData = jsonMatch[1];
          } else {
            jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
            if (jsonMatch) {
              compressedData = jsonMatch[1];
            } else {
              jsonMatch = content.match(/```\n([\s\S]*?)\n```/);
              if (jsonMatch) {
                compressedData = jsonMatch[1];
              }
            }
          }
        }
      }
    }

    if (!compressedData && excalidrawFile) {
      const excalidrawPath = path.join(dirPath, excalidrawFile);
      compressedData = fs.readFileSync(excalidrawPath, 'utf8');
    }

    const title =
      frontmatter.title ||
      slug.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    return {
      slug,
      title,
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      description: frontmatter.description || `System design diagram: ${title}`,
      tags: frontmatter.tags || [],
      content,
      frontmatter,
      compressedData,
      type: content.trim() ? 'markdown' : 'excalidraw',
    };
  } catch (error) {
    console.error(`Error reading systems design file ${slug}:`, error);
    return null;
  }
}

export function getAllSystemsDesign() {
  const slugs = getAllSystemsDesignSlugs();
  const systemsDesign = slugs
    .map((slug) => getSystemsDesignBySlug(slug))
    .filter(Boolean)
    .filter((diagram) => diagram.frontmatter.publish_status !== 'draft')
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return systemsDesign;
}

export function getSystemsDesignTags(includeDrafts = false) {
  const systemsDesign = getAllSystemsDesign(includeDrafts);
  const allTags = systemsDesign.flatMap((diagram) => diagram.tags || []);
  return [...new Set(allTags)];
}
