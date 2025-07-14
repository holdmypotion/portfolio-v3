import { NextResponse } from 'next/server';
import { getAllSystemsDesign } from '@/lib/systems-design';

export async function GET() {
  try {
    const systemsDesign = getAllSystemsDesign();
    return NextResponse.json(systemsDesign);
  } catch (error) {
    console.error('Error fetching systems design:', error);
    return NextResponse.json(
      { error: 'Failed to fetch systems design' },
      { status: 500 },
    );
  }
}
