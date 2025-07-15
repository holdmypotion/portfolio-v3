# Portfolio v3

A minimal, clean portfolio built with Next.js featuring file-based content management, GitHub project integration, and comprehensive SEO optimizations.

<img width="5088" height="3232" alt="image" src="https://github.com/user-attachments/assets/bc5b12fa-747c-4ec1-bdb0-8bfb3609bb13" />

## Features

- 📝 Blog with markdown support
- 🚀 **GitHub-integrated project showcase** with real-time data
- 🔧 **Systems Design diagrams with Excalidraw support**
- 📄 Resume versions management
- 🔍 Search and filtering across all content
- 📱 Responsive design
- 🎨 Minimal, monospace aesthetic
- ⌨️ Keyboard navigation shortcuts
- 📝 Draft/Published content management
- 🔗 Custom slug support
- 🎯 Smart content filtering
- 🔍 **Comprehensive SEO optimizations**
- ⭐ **GitHub repository stats** (stars, forks, language, topics)
- 🔄 **Live project updates** from GitHub API with caching

## SEO Features

### ✅ Technical SEO

- **Dynamic metadata generation** for all pages (including GitHub projects)
- **Open Graph** and **Twitter Card** support
- **JSON-LD structured data** for rich snippets (Person, SoftwareApplication schemas)
- **Sitemap.xml** auto-generation (includes GitHub projects)
- **robots.txt** configuration
- **RSS feed** for blog posts
- **Canonical URLs** to prevent duplicate content
- **Proper heading hierarchy** (H1, H2, H3)
- **Semantic HTML** structure

### ✅ Performance & Accessibility

- **Viewport meta tag** for mobile SEO
- **Security headers** (CSP, XSS protection, Content-Type-Options)
- **Aria labels** and semantic markup
- **Image optimization** configuration
- **Fast loading** with Next.js optimizations
- **Caching strategies** for GitHub API calls

### ✅ Content SEO

- **Individual page metadata** for blogs, projects, and systems design
- **Dynamic titles and descriptions**
- **Keyword optimization** with project-specific terms
- **Rich snippets** with structured data
- **Social media sharing** optimization
- **GitHub project metadata** integration

## GitHub Project Integration

### How It Works

Projects are now dynamically fetched from your GitHub repositories instead of static markdown files. This provides:

- **Real-time updates** from your GitHub activity
- **Automatic project metadata** (stars, forks, language, topics)
- **README content** integration
- **Repository statistics** and status tracking
- **SEO optimization** with structured data

### Configuration

Projects are configured via `content/config/github.json`:

```json
{
  "username": "your-github-username",
  "showcase_repos": [
    {
      "name": "repo-name-1",
      "publish_status": "published"
    },
    {
      "name": "repo-name-2",
      "publish_status": "published"
    },
    {
      "name": "repo-name-3",
      "publish_status": "draft"
    }
  ],
  "display_settings": {
    "show_stars": true,
    "show_forks": true,
    "show_language": true,
    "show_topics": true,
    "show_last_updated": true,
    "max_topics_display": 5
  }
}
```

**Repository Configuration Options:**

- `name`: The GitHub repository name
- `publish_status`: Controls visibility on your website
  - `"published"` - Project is visible on the website
  - `"draft"` - Project is hidden from the website (but still configured)

**Backward Compatibility**: The old array format `["repo-name-1", "repo-name-2"]` is still supported and will default all repositories to `published` status.

### Project Data Structure

Each GitHub project includes:

- **Basic Info**: Name, description, tech stack
- **GitHub Stats**: Stars, forks, primary language
- **Repository Topics**: For categorization
- **README Content**: Automatically fetched and rendered
- **Status Classification**: Active, maintenance, archived
- **SEO Metadata**: Structured data for search engines

### GitHub API Integration

The system uses GitHub's REST API with the following features:

- **Caching**: 10-minute cache to avoid rate limits
- **Authentication**: Optional GitHub token for higher rate limits
- **Error Handling**: Graceful fallbacks when API is unavailable
- **Batch Processing**: Efficient fetching of multiple repositories

### Adding Projects

1. **Create/update your GitHub repository**
2. **Add repository to `showcase_repos`** in `content/config/github.json`:
   ```json
   {
     "name": "your-repo-name",
     "publish_status": "published" // or "draft" to hide initially
   }
   ```
3. **Optional**: Add topics to your GitHub repo for better categorization
4. **Optional**: Ensure your README is informative for better project pages

### Managing Project Visibility

You can control which projects appear on your website without removing them from the configuration:

- **Show a project**: Set `publish_status: "published"`
- **Hide a project**: Set `publish_status: "draft"`
- **Testing**: Projects with `draft` status are hidden from visitors but can be accessed directly via URL during development

### GitHub Token Setup (Optional)

For higher API rate limits, set the `GITHUB_TOKEN` environment variable:

```bash
# .env.local
GITHUB_TOKEN=your_github_personal_access_token
```

## Keyboard Navigation

Navigate quickly using keyboard shortcuts:

- `h` - Go to Home
- `r` - Go to Resume
- `b` - Go to Blog
- `p` - Go to Projects
- `s` - Go to Systems Design
- `/` - Focus search (when on blog/systems-design page)
- `Escape` - Clear input focus

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. **Configure your GitHub projects**: Update `content/config/github.json` with your GitHub username and showcase repositories

3. **Configure your domain**: Replace `https://www.holdmypotion.tech` in the following files:

   - `src/app/layout.js`
   - `src/app/sitemap.js`
   - `src/app/feed.xml/route.js`
   - `public/robots.txt`

4. **Set up SEO verification** (REQUIRED for production):

   - Add Google Search Console verification code in `src/app/layout.js`
   - Update Twitter handle in the metadata
   - Verify email addresses in RSS feed and structured data

5. **Set up Google Analytics 4** (RECOMMENDED):

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID from Google Analytics.

6. **Optional**: Set up GitHub token for higher API rate limits:

```bash
# .env.local
GITHUB_TOKEN=your_github_personal_access_token
```

7. Run the development server:

```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## SEO Configuration

### Required Changes for Production

Before deploying, **YOU MUST UPDATE**:

1. **Domain URLs** in all SEO files (layout.js, sitemap.js, feed.xml/route.js, robots.txt)
2. **Google verification code** in `src/app/layout.js` (currently placeholder)
3. **Twitter handle** in social metadata
4. **Email addresses** in RSS feed and structured data
5. **GitHub username** in `content/config/github.json`

### Production SEO Checklist

- [ ] **Google Search Console verification code** updated
- [ ] **Domain URLs** updated in all files
- [ ] **Social media handles** verified (Twitter, LinkedIn)
- [ ] **Email addresses** updated in RSS feed and structured data
- [ ] **GitHub configuration** completed
- [ ] **Sitemap accessible** at `/sitemap.xml`
- [ ] **RSS feed working** at `/feed.xml`
- [ ] **robots.txt configured** correctly
- [ ] **Structured data validated** (use Google's Rich Results Test)
- [ ] **Open Graph images** optimized
- [ ] **Mobile responsiveness** tested
- [ ] **Page speed** optimized

### Optional Enhancements

- ✅ **Google Analytics 4** integrated with Next.js optimization
- Configure **GitHub token** for higher API rate limits
- Add **custom social media images** for projects
- Set up **automated deployment** on repository updates
- Add **404 page** optimization
- Configure **security headers** (already partially implemented)

## Content Management

### Adding a Blog Post

Create a new markdown file in `content/blogs/` with the format:

```markdown
---
title: 'Your Blog Title'
date: '2024-01-10'
tags: ['booknotes', 'web'] # See available tags below
slug: 'your-blog-slug'
description: 'Brief description for SEO and social sharing'
featuredImage: 'https://example.com/image.jpg' # Optional
publish_status: 'published' # or 'draft'
---

Your blog content here...
```

**Available Tags (use only these 11 tags):**

1. `booknotes` - Book summaries and notes
2. `business` - Business, entrepreneurship, freelancing, marketing
3. `career` - Career development, professional growth
4. `design` - UI/UX, visual design, Figma
5. `development` - Programming, coding, technical tutorials
6. `guide` - How-to guides, tutorials, frameworks
7. `leadership` - Management, team leadership
8. `mobile` - React Native, mobile development
9. `personal-development` - Self-improvement, productivity, psychology
10. `tools` - DevOps, Docker, development tools
11. `web` - Web development, JavaScript, React

### Adding Systems Design Diagrams

Systems design content supports both Excalidraw diagrams and markdown documentation. There are two formats:

**Option 1: Directory-based (Recommended)**

Create a directory in `content/systems-design/` with both files:

```
content/systems-design/URL_Shortener/
├── URL_Shortener.md
└── URL_Shortener.excalidraw
```

**Markdown file format:**

```markdown
---
title: 'URL Shortener System Design'
date: '2025-01-15'
description: 'Scalable URL shortening service design'
tags: ['distributed-systems', 'caching']
slug: 'url-shortener'
publish_status: 'published' # or 'draft'
---

# System Design Content

Your detailed system design explanation here...
```

**Option 2: Standalone Excalidraw file**

Create a single `.excalidraw.md` file in `content/systems-design/`:

```markdown
---
title: 'Payment System Design'
date: '2025-01-15'
description: 'Payment processing system like Stripe'
tags: ['payments', 'microservices']
slug: 'payment-system'
publish_status: 'published'
---

# Excalidraw Data

## Text Elements

[Excalidraw compressed data here...]
```

**Available Systems Design Tags:**

Use descriptive tags for categorization:

- `distributed-systems` - Distributed architecture patterns
- `microservices` - Microservice architectures
- `caching` - Caching strategies and patterns
- `databases` - Database design and scaling
- `messaging` - Message queues and event systems
- `security` - Security considerations
- `scalability` - Scaling patterns
- `real-time` - Real-time systems (WebSockets, streaming)
- `storage` - File/object storage systems
- `search` - Search engine implementations
- `analytics` - Analytics and data processing
- `payments` - Payment processing systems
- `social` - Social media features
- `content-delivery` - CDN and content systems
- `monitoring` - Observability and monitoring

**How Excalidraw Integration Works:**

The portfolio uses `@excalidraw/excalidraw` to render interactive diagrams. Excalidraw files can be:

- Created using the [Excalidraw web app](https://excalidraw.com) and exported
- Embedded as compressed JSON data within markdown files
- Stored as standalone `.excalidraw` files alongside markdown documentation
- Viewed interactively with zoom, pan, and theme support

### Content Publishing System

**Published vs Draft Content:**

- Set `publish_status: 'published'` to make content publicly visible
- Set `publish_status: 'draft'` to hide content from public view
- If `publish_status` is not specified, content defaults to 'published' (backward compatibility)

**Custom Slugs:**

- Add a `slug` field to frontmatter for custom URL paths
- If no slug is provided, the filename is used as the slug
- Custom slugs allow for cleaner, more SEO-friendly URLs

### Project Status Types (Auto-determined from GitHub)

- `production` - Live, deployed projects (green indicator)
- `active` - Recently updated projects (blue indicator)
- `maintenance` - Moderately active projects (yellow indicator)
- `archived` - Archived or inactive projects (gray indicator)

### Updating Resume

1. Add your resume PDF to `public/resumes/`
2. Update `content/config/resumes.json` with the new version

## API Endpoints

The portfolio includes several API endpoints for dynamic content:

- `GET /api/blogs` - Fetch all published blogs
- `GET /api/blogs/tags` - Get all available blog tags
- `GET /api/projects` - Fetch all published projects from GitHub
- `GET /api/systems-design` - Fetch all published systems design diagrams
- `GET /api/systems-design/tags` - Get all available systems design tags
- `GET /api/profile` - Get profile information

## SEO URLs

- `GET /sitemap.xml` - Auto-generated sitemap (includes GitHub projects)
- `GET /robots.txt` - Search engine crawling instructions
- `GET /feed.xml` - RSS feed for blog posts

## File Structure

```
portfolio-v3/
├── content/
│   ├── blogs/           # Blog markdown files
│   ├── systems-design/  # Systems design diagrams and docs
│   └── config/          # Configuration files
│       ├── github.json  # GitHub integration config
│       ├── profile.json # Profile information
│       └── resumes.json # Resume versions
├── public/
│   ├── resumes/         # Resume PDF files
│   ├── robots.txt       # SEO crawling instructions
│   └── favicon.ico      # Site favicon
├── src/
│   ├── app/             # Next.js app router
│   │   ├── layout.js    # Global SEO metadata
│   │   ├── sitemap.js   # Dynamic sitemap generator
│   │   ├── feed.xml/    # RSS feed generator
│   │   ├── blog/        # Blog pages with metadata
│   │   ├── projects/    # Project pages with GitHub integration
│   │   ├── systems-design/ # Systems design pages
│   │   └── resume/      # Resume page
│   ├── components/      # React components
│   │   ├── ExcalidrawViewer.js  # Excalidraw diagram renderer
│   │   ├── ProjectCard.js       # Project card with GitHub data
│   │   └── ...          # Other components
│   └── lib/             # Utility functions
│       ├── github.js           # GitHub API integration
│       ├── systems-design.js   # Systems design utilities
│       └── ...          # Other utilities
├── next.config.js       # Next.js config with SEO headers
└── package.json
```

## Development Features

- **Hot reload** - Changes reflect immediately during development
- **Type-safe** - Built with modern JavaScript practices
- **Responsive** - Works on all device sizes
- **SEO-friendly** - Comprehensive optimization for search engines
- **Performance** - Fast loading and navigation with GitHub API caching
- **Accessibility** - WCAG compliant markup and navigation
- **GitHub Integration** - Real-time project updates from repositories

## Deployment

This project can be deployed on Vercel, Netlify, or any static hosting platform.

### For Vercel (Recommended):

1. Set up GitHub token (optional but recommended):

```bash
# In Vercel dashboard, add environment variable:
GITHUB_TOKEN=your_github_personal_access_token
```

2. Deploy:

```bash
npm run build
```

The site will be automatically deployed when you push to your repository.

### For Static Hosting:

Note: GitHub integration requires server-side API routes. For static hosting, you'll need to disable GitHub integration or use a different approach.

## Production Deployment Checklist

Before deploying to production, ensure you've completed:

### ✅ Required Configuration

- [ ] **GitHub configuration** updated in `content/config/github.json`
- [ ] **Domain URLs** updated in all SEO files
- [ ] **Google verification code** updated in `src/app/layout.js`
- [ ] **Twitter handle** updated in metadata
- [ ] **Email addresses** updated in RSS feed and structured data

### ✅ SEO Verification

- [ ] **Google Search Console** set up and verified
- [ ] **Sitemap submitted** to search engines
- [ ] **RSS feed** accessible at `/feed.xml`
- [ ] **robots.txt** configured correctly
- [ ] **Structured data** validated with Google's Rich Results Test
- [ ] **Open Graph images** optimized and working
- [ ] **Mobile responsiveness** tested
- [ ] **Page speed** optimized

### ✅ GitHub Integration

- [ ] **GitHub token** configured for higher API limits (recommended)
- [ ] **Showcase repositories** selected and configured
- [ ] **Repository READMEs** are informative and well-formatted
- [ ] **Repository topics** added for better categorization

### ✅ Content Review

- [ ] **Blog posts** reviewed and published
- [ ] **Systems design** diagrams tested and accessible
- [ ] **Resume** updated and accessible
- [ ] **Profile information** current and accurate

## Recent Updates

- ✅ **Google Analytics 4 integration** with Next.js optimization and privacy-focused implementation
- ✅ **GitHub-integrated project system** with real-time updates
- ✅ **Enhanced project metadata** with stars, forks, language, topics
- ✅ **GitHub API caching** for performance optimization
- ✅ **Dynamic project SEO** with structured data
- ✅ **Repository-based project management** via configuration
- ✅ **Project publish/draft status** for controlling visibility
- ✅ **Comprehensive SEO implementation** with production-ready features
- ✅ **Systems Design section** with Excalidraw integration
- ✅ **Security headers** and performance optimization
- ✅ **Publish/draft content management** system
- ✅ **Custom slug support** for better URLs
- ✅ **Keyboard navigation shortcuts**
- ✅ **Enhanced accessibility** with ARIA labels
- ✅ **Search and filtering** across all content types

## Performance & SEO

The portfolio is optimized for:

- **Core Web Vitals** compliance
- **Fast loading** with Next.js optimization and GitHub API caching
- **SEO-friendly** URLs and structure with GitHub project integration
- **Mobile-first** responsive design
- **Accessibility** standards (WCAG 2.1)
- **Rich snippets** with JSON-LD structured data
- **Social media** sharing optimization
