# Portfolio v3

A minimal, clean portfolio built with Next.js featuring file-based content management.

## Features

- 📝 Blog with markdown support
- 🚀 Project showcase
- 📄 Resume versions management
- 🔍 Search and filtering
- 📱 Responsive design
- 🎨 Minimal, monospace aesthetic
- ⌨️ Keyboard navigation shortcuts
- 📝 Draft/Published content management
- 🔗 Custom slug support
- 🎯 Smart content filtering

## Keyboard Navigation

Navigate quickly using keyboard shortcuts:

- `h` - Go to Home
- `r` - Go to Resume
- `b` - Go to Blog
- `p` - Go to Projects
- `/` - Focus blog search (when on blog page)
- `Escape` - Clear input focus

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Management

### Adding a Blog Post

Create a new markdown file in `content/blogs/` with the format:

```markdown
---
title: 'Your Blog Title'
date: '2024-01-10'
tags: ['tag1', 'tag2']
slug: 'your-blog-slug'
description: 'Brief description of your blog post'
publish_status: 'published' # or 'draft'
---

Your blog content here...
```

### Adding a Project

Create a new markdown file in `content/projects/` with the format:

```markdown
---
name: 'project-name'
description: 'Project description'
tech: 'Tech stack'
github: 'https://github.com/username/repo'
live: 'https://project-url.com'
status: 'production' # or 'active', 'archived'
featured: true
slug: 'custom-project-slug'
publish_status: 'published' # or 'draft'
---

Project details...
```

### Content Publishing System

**Published vs Draft Content:**

- Set `publish_status: 'published'` to make content publicly visible
- Set `publish_status: 'draft'` to hide content from public view
- If `publish_status` is not specified, content defaults to 'published' (backward compatibility)

**Custom Slugs:**

- Add a `slug` field to frontmatter for custom URL paths
- If no slug is provided, the filename is used as the slug
- Custom slugs allow for cleaner, more SEO-friendly URLs

### Project Status Types

- `production` - Live, deployed projects (green indicator)
- `active` - Currently being developed (blue indicator)
- `archived` - No longer maintained (orange indicator)

### Updating Resume

1. Add your resume PDF to `public/resumes/`
2. Update `content/config/resumes.json` with the new version

## API Endpoints

The portfolio includes several API endpoints for dynamic content:

- `GET /api/blogs` - Fetch all published blogs
- `GET /api/blogs/tags` - Get all available blog tags
- `GET /api/projects` - Fetch all published projects
- `GET /api/profile` - Get profile information

## File Structure

```
portfolio-v3/
├── content/
│   ├── blogs/           # Blog markdown files
│   ├── projects/        # Project markdown files
│   └── config/          # Configuration files
├── public/
│   └── resumes/         # Resume PDF files
├── src/
│   ├── app/             # Next.js app router
│   ├── components/      # React components
│   └── lib/             # Utility functions
```

## Development Features

- **Hot reload** - Changes reflect immediately during development
- **Type-safe** - Built with modern JavaScript practices
- **Responsive** - Works on all device sizes
- **SEO-friendly** - Optimized for search engines
- **Performance** - Fast loading and navigation

## Deployment

This project can be deployed on Vercel, Netlify, or any static hosting platform.

For Vercel:

```bash
npm run build
```

The site will be automatically deployed when you push to your repository.

## Recent Updates

- ✅ Added publish_status functionality for content management
- ✅ Implemented custom slug support for better URLs
- ✅ Added keyboard navigation shortcuts
- ✅ Enhanced project status visualization
- ✅ Improved API endpoints with error handling
- ✅ Added backward compatibility for existing content
