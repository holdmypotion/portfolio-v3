---
title: 'URL Shortener System Design'
date: '2024-01-15'
description: 'System design for a scalable URL shortening service like bit.ly or tinyurl, handling millions of requests with efficient encoding and caching strategies.'
tags: ['product-style', 'read-heavy']
publish_status: 'published'
---

# URL Shortener System Design

Scalable URL shortening service handling millions of URLs and redirections with Base62 encoding.

## Key Requirements

- Shorten long URLs, redirect short URLs, custom aliases
- 100M URLs/day, < 100ms latency, 99.9% availability
- Analytics and URL expiration support

## Core Components

- **Encoding Service**: Base62 encoding with counter-based uniqueness
- **Database**: URL mappings with sharding by short URL
- **Cache**: Redis for hot URLs and rate limiting
- **Analytics**: Click tracking and metrics collection
