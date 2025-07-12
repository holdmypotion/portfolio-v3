import { getAllBlogs } from '@/lib/blogs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const blogs = getAllBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json([], { status: 500 });
  }
}
