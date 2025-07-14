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

function getSystemsDesignContentByDirName(dirName) {
  try {
    const dirPath = path.join(systemsDesignDirectory, dirName);

    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
      throw new Error(`Directory not found: ${dirName}`);
    }

    const files = fs.readdirSync(dirPath);
    const excalidrawFile = files.find((file) => file.endsWith('.excalidraw'));
    const mdFile = files.find((file) => file.endsWith('.md'));

    let frontmatter = {};
    let content = '';
    let excalidrawData = null;

    if (mdFile) {
      const mdPath = path.join(dirPath, mdFile);
      const mdContents = fs.readFileSync(mdPath, 'utf8');

      if (mdContents.trim()) {
        const { data, content: mdContent } = matter(mdContents);
        frontmatter = data;
        content = mdContent;
      }
    }

    if (excalidrawFile) {
      const excalidrawPath = path.join(dirPath, excalidrawFile);
      excalidrawData = fs.readFileSync(excalidrawPath, 'utf8');
    }

    const title =
      frontmatter.title ||
      dirName.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    return {
      slug: frontmatter.slug || dirName,
      dirName,
      title,
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      description: frontmatter.description || `System design diagram: ${title}`,
      tags: frontmatter.tags || [],
      content,
      frontmatter,
      excalidrawData,
      type: content.trim() ? 'markdown' : 'excalidraw',
    };
  } catch (error) {
    console.error(`Error reading systems design file ${dirName}:`, error);
    return null;
  }
}

export function getSystemsDesignBySlug(slug) {
  // First, try to find by frontmatter slug
  const allDirNames = getAllSystemsDesignSlugs();
  let targetDirName = null;

  for (const dirName of allDirNames) {
    const systemsDesign = getSystemsDesignContentByDirName(dirName);
    if (systemsDesign && systemsDesign.slug === slug) {
      targetDirName = dirName;
      break;
    }
  }

  // If not found by frontmatter slug, try to find by directory name
  if (!targetDirName && allDirNames.includes(slug)) {
    targetDirName = slug;
  }

  if (!targetDirName) {
    return null;
  }

  return getSystemsDesignContentByDirName(targetDirName);
}

export function getAllSystemsDesign() {
  const dirNames = getAllSystemsDesignSlugs();
  const systemsDesign = dirNames
    .map((dirName) => getSystemsDesignContentByDirName(dirName))
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
