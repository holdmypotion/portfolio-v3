import { getAllBlogs } from '@/lib/blogs';

export async function GET() {
  const blogs = getAllBlogs();
  const baseUrl = 'https://www.holdmypotion.tech';

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Rahul Sharma - Blog</title>
    <description>Technical articles and insights on software engineering, web development, and modern programming practices</description>
    <link>${baseUrl}/blog</link>
    <language>en-US</language>
    <managingEditor>holdmypotion@gmail.com (Rahul Sharma)</managingEditor>
    <webMaster>holdmypotion@gmail.com (Rahul Sharma)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${blogs
      .map(
        (blog) => `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <description><![CDATA[${
        blog.description ||
        `Read about ${blog.title} - Technical article by Rahul Sharma`
      }]]></description>
      <link>${baseUrl}/blog/${blog.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${blog.slug}</guid>
      <pubDate>${new Date(blog.date).toUTCString()}</pubDate>
      <author>holdmypotion@gmail.com (Rahul Sharma)</author>
      ${(blog.tags || [])
        .map((tag) => `<category>${tag}</category>`)
        .join('\n      ')}
    </item>`,
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
