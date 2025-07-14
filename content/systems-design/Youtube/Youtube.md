---
title: 'YouTube HLD'
date: '2025-07-14'
description: 'Comprehensive system design for a video streaming platform like YouTube, handling massive scale video uploads, processing, storage, and global content delivery.'
tags: ['product-style', 'read-heavy', 'distributed-systems']
slug: 'youtube'
publish_status: 'published'
---

# YouTube System Design

Video streaming platform handling billions of users, petabytes of content, and millions of concurrent streams.

## Key Requirements

- Video upload, processing, streaming with adaptive bitrate
- Search, recommendations, user management, analytics
- Handle 500+ hours uploaded/minute, billions of hours viewed daily
- Global CDN delivery, multiple quality variants

## Core Components

- **Upload Service**: Video ingestion with metadata processing
- **Processing Pipeline**: Transcoding, multiple qualities, thumbnails
- **Storage**: Blob storage for videos, databases for metadata
- **CDN**: Global edge servers with adaptive streaming
