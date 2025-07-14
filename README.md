# Portfolio v3

A minimal, clean portfolio built with Next.js featuring file-based content management and comprehensive SEO optimizations.

<img width="5088" height="3232" alt="image" src="https://github.com/user-attachments/assets/bc5b12fa-747c-4ec1-bdb0-8bfb3609bb13" />

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
- 🔍 **Comprehensive SEO optimizations**

## SEO Features

### ✅ Technical SEO

- **Dynamic metadata generation** for all pages
- **Open Graph** and **Twitter Card** support
- **JSON-LD structured data** for rich snippets
- **Sitemap.xml** auto-generation
- **robots.txt** configuration
- **RSS feed** for blog posts
- **Canonical URLs** to prevent duplicate content
- **Proper heading hierarchy** (H1, H2, H3)
- **Semantic HTML** structure

### ✅ Performance & Accessibility

- **Viewport meta tag** for mobile SEO
- **Security headers** (CSP, XSS protection)
- **Aria labels** and semantic markup
- **Image optimization** ready
- **Fast loading** with Next.js optimizations

### ✅ Content SEO

- **Individual page metadata** for blogs and projects
- **Dynamic titles and descriptions**
- **Keyword optimization**
- **Rich snippets** with structured data
- **Social media sharing** optimization

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

2. **Configure your domain**: Replace `https://www.holdmypotion.tech` in the following files:

   - `src/app/layout.js`
   - `src/app/sitemap.js`
   - `src/app/feed.xml/route.js`
   - `public/robots.txt`

3. **Set up SEO verification** (optional):

   - Add Google Search Console verification code in `src/app/layout.js`
   - Update social media handles in the metadata

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## SEO Configuration

### Required Changes

Before deploying, make sure to update:

1. **Domain URLs** in all SEO files
2. **Google verification code** in layout.js
3. **Twitter handle** in social metadata
4. **Email address** in RSS feed

### Optional Enhancements

- Add **Google Analytics** or other tracking
- Set up **Google Search Console**
- Configure **social media meta images**
- Add **favicon variations** for different devices

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

### Adding a Project

Create a new markdown file in `content/projects/` with the format:

```markdown
---
name: 'project-name'
description: 'Project description for SEO'
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

## SEO URLs

- `GET /sitemap.xml` - Auto-generated sitemap
- `GET /robots.txt` - Search engine crawling instructions
- `GET /feed.xml` - RSS feed for blog posts

## File Structure

```
portfolio-v3/
├── content/
│   ├── blogs/           # Blog markdown files
│   ├── projects/        # Project markdown files
│   └── config/          # Configuration files
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
│   │   ├── projects/    # Project pages with metadata
│   │   └── resume/      # Resume page
│   ├── components/      # React components
│   └── lib/             # Utility functions
├── next.config.js       # Next.js config with SEO headers
└── package.json
```

## Development Features

- **Hot reload** - Changes reflect immediately during development
- **Type-safe** - Built with modern JavaScript practices
- **Responsive** - Works on all device sizes
- **SEO-friendly** - Comprehensive optimization for search engines
- **Performance** - Fast loading and navigation
- **Accessibility** - WCAG compliant markup and navigation

## Deployment

This project can be deployed on Vercel, Netlify, or any static hosting platform.

### For Vercel (Recommended):

```bash
npm run build
```

The site will be automatically deployed when you push to your repository.

### For Static Hosting:

Uncomment the static export settings in `next.config.js`:

```javascript
output: 'export',
trailingSlash: true,
images: {
  unoptimized: true,
},
```

Then build:

```bash
npm run build
```

## SEO Checklist

Before going live, ensure:

- [ ] Domain URLs updated in all files
- [ ] Google Search Console set up
- [ ] Social media metadata configured
- [ ] RSS feed working (`/feed.xml`)
- [ ] Sitemap accessible (`/sitemap.xml`)
- [ ] robots.txt configured
- [ ] All pages have unique titles and descriptions
- [ ] Structured data validated
- [ ] Mobile-friendly tested
- [ ] Page speed optimized

## Recent Updates

- ✅ **Comprehensive SEO implementation**
- ✅ Dynamic metadata for all pages
- ✅ Open Graph and Twitter Cards
- ✅ JSON-LD structured data
- ✅ Auto-generated sitemap and RSS feed
- ✅ Security headers and performance optimization
- ✅ Added publish_status functionality for content management
- ✅ Implemented custom slug support for better URLs
- ✅ Added keyboard navigation shortcuts
- ✅ Enhanced project status visualization
- ✅ Improved accessibility with ARIA labels

## Performance

The portfolio is optimized for:

- **Core Web Vitals** compliance
- **Fast loading** with Next.js optimization
- **SEO-friendly** URLs and structure
- **Mobile-first** responsive design
- **Accessibility** standards (WCAG 2.1)
