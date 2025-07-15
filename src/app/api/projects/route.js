import { getAllGitHubProjects } from '@/lib/github';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    console.log('Fetching projects from GitHub API...');
    const githubProjects = await getAllGitHubProjects();

    if (githubProjects.length === 0) {
      console.warn('No projects found from GitHub API');
      return NextResponse.json([], { status: 200 });
    }

    console.log(
      `Successfully fetched ${githubProjects.length} projects from GitHub`,
    );
    return NextResponse.json(githubProjects);
  } catch (error) {
    console.error('Error fetching projects from GitHub:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects from GitHub' },
      { status: 500 },
    );
  }
}
