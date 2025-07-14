import { getSystemsDesignTags } from '@/lib/systems-design';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const tags = getSystemsDesignTags();
    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error fetching systems design tags:', error);
    return NextResponse.json([], { status: 500 });
  }
}
