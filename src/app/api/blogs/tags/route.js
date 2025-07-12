import { getBlogTags } from '@/lib/blogs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const tags = getBlogTags();
    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error fetching blog tags:', error);
    return NextResponse.json([], { status: 500 });
  }
}
