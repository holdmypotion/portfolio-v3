# Portfolio v3

A minimal, clean portfolio built with Next.js featuring file-based content management.

## Features

- 📝 Blog with markdown support
- 🚀 Project showcase
- 📄 Resume versions management
- 🔍 Search and filtering
- 📱 Responsive design
- 🎨 Minimal, monospace aesthetic

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
status: 'production'
featured: true
---

Project details...
```

### Updating Resume

1. Add your resume PDF to `public/resumes/`
2. Update `content/config/resumes.json` with the new version

## Deployment

This project can be deployed on Vercel, Netlify, or any static hosting platform.

For Vercel:

```bash
npm run build
```

The site will be automatically deployed when you push to your repository.
