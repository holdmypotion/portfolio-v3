import fs from 'fs';
import path from 'path';

export function getAllResumes() {
  const resumesPath = path.join(process.cwd(), 'content/config/resumes.json');
  const fileContents = fs.readFileSync(resumesPath, 'utf8');
  const data = JSON.parse(fileContents);

  // Sort by date (newest first)
  return data.resumes.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getLatestResume() {
  const resumes = getAllResumes();
  return resumes.find((resume) => resume.latest) || resumes[0];
}
