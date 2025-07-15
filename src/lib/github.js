import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const GITHUB_API_BASE = 'https://api.github.com';

// Load configuration
function getGitHubConfig() {
  try {
    const configPath = path.join(process.cwd(), 'content/config/github.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    console.warn('GitHub config file not found, using defaults');
    return {
      username: 'holdmypotion',
      showcase_repos: [
        { name: 'loona', publish_status: 'published' },
        { name: 'portfolio-v3', publish_status: 'published' },
        { name: 'mind-sport', publish_status: 'published' },
        { name: 'nvim', publish_status: 'published' },
        { name: 'portfolio-v2', publish_status: 'published' },
      ],
      display_settings: {
        show_stars: true,
        show_forks: true,
        show_language: true,
        show_topics: true,
        show_last_updated: true,
        max_topics_display: 5,
      },
    };
  }
}

// Cache for GitHub API responses to avoid rate limits
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

async function fetchWithCache(url, options = {}) {
  const cacheKey = `${url}_${JSON.stringify(options)}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'holdmypotion-portfolio',
    // Add auth if token is available
    ...(process.env.GITHUB_TOKEN && {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    }),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  cache.set(cacheKey, { data, timestamp: Date.now() });

  return data;
}

export async function getShowcaseRepositories(includeDrafts = false) {
  const config = getGitHubConfig();

  try {
    const repoConfigs = config.showcase_repos.map((repo) => {
      // If it's a string (old format), convert to object
      if (typeof repo === 'string') {
        return {
          name: repo,
          publish_status: 'published', // Default to published for backward compatibility
        };
      }
      // If it's already an object (new format), use as is
      return repo;
    });

    // Filter by publish_status unless includeDrafts is true
    const filteredRepoConfigs = includeDrafts
      ? repoConfigs
      : repoConfigs.filter((repoConfig) => {
          // Default to 'published' if publish_status is not specified (backward compatibility)
          const publishStatus = repoConfig.publish_status || 'published';
          return publishStatus === 'published';
        });

    // Fetch each repository from the filtered list
    const repos = await Promise.all(
      filteredRepoConfigs.map(async (repoConfig) => {
        try {
          const repoUrl = `${GITHUB_API_BASE}/repos/${config.username}/${repoConfig.name}`;
          const repo = await fetchWithCache(repoUrl);

          // Get additional details
          const [readme, languages] = await Promise.all([
            getRepositoryReadme(repo.full_name),
            getRepositoryLanguages(repo.full_name),
          ]);

          return {
            ...repo,
            readme_content: readme,
            languages,
            publish_status: repoConfig.publish_status || 'published', // Include publish_status in the result
          };
        } catch (error) {
          console.error(`Error fetching repository ${repoConfig.name}:`, error);
          return null;
        }
      }),
    );

    const validRepos = repos.filter((repo) => repo !== null);

    return validRepos;
  } catch (error) {
    console.error('Error fetching showcase repositories:', error);
    return [];
  }
}

export async function getRepositoryReadme(repoFullName) {
  try {
    const readmeUrl = `${GITHUB_API_BASE}/repos/${repoFullName}/readme`;
    const readmeData = await fetchWithCache(readmeUrl);

    // Decode base64 content
    const content = Buffer.from(readmeData.content, 'base64').toString('utf8');

    return content;
  } catch (error) {
    console.error(`Error fetching README for ${repoFullName}:`, error);
    return '# Project\n\nREADME content not available.';
  }
}

export async function getRepositoryLanguages(repoFullName) {
  try {
    const languagesUrl = `${GITHUB_API_BASE}/repos/${repoFullName}/languages`;
    const languages = await fetchWithCache(languagesUrl);

    // Convert to array of language names sorted by usage
    return Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .map(([lang]) => lang);
  } catch (error) {
    console.error(`Error fetching languages for ${repoFullName}:`, error);
    return [];
  }
}

export function transformRepoToProject(repo) {
  const config = getGitHubConfig();

  // Transform GitHub repository data to match our project structure
  const languages = repo.languages || [];
  const tech = languages.join(', ');

  // Determine status based on repository activity
  const lastUpdated = new Date(repo.updated_at);
  const monthsAgo =
    (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24 * 30);

  let status = 'active';
  if (repo.archived) {
    status = 'archived';
  } else if (monthsAgo < 3) {
    status = 'active';
  } else if (monthsAgo < 12) {
    status = 'maintenance';
  } else {
    status = 'archived';
  }

  // Determine if featured based on stars or topics
  const featured =
    repo.stargazers_count > 5 ||
    repo.topics?.includes('featured') ||
    repo.topics?.includes('showcase');

  return {
    name: repo.name,
    slug: repo.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    description: repo.description || 'No description available',
    tech,
    github: repo.html_url,
    live: repo.homepage || null,
    status,
    featured,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    topics: repo.topics || [],
    updated_at: repo.updated_at,
    created_at: repo.created_at,
    readme_content: repo.readme_content || '',
    publish_status: repo.publish_status || 'published', // Include publish_status
    repo_data: {
      full_name: repo.full_name,
      private: repo.private,
      clone_url: repo.clone_url,
      ssh_url: repo.ssh_url,
    },
  };
}

export async function getAllGitHubProjects(includeDrafts = false) {
  try {
    const repos = await getShowcaseRepositories(includeDrafts);
    const projects = repos.map(transformRepoToProject);

    // Sort by featured status, then by stars, then by last updated
    return projects.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      if (a.stars !== b.stars) return b.stars - a.stars;

      return new Date(b.updated_at) - new Date(a.updated_at);
    });
  } catch (error) {
    console.error('Error getting GitHub projects:', error);
    return [];
  }
}

export async function getGitHubProjectBySlug(slug, includeDrafts = false) {
  try {
    const projects = await getAllGitHubProjects(includeDrafts);
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
      throw new Error(`Project with slug "${slug}" not found`);
    }

    return project;
  } catch (error) {
    console.error(`Error getting GitHub project ${slug}:`, error);
    throw error;
  }
}
