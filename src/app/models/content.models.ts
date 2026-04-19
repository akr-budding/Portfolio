export interface SkillGroup {
  title: string;
  icon: string;
  items: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  image: string;
  githubUrl: string;
  demoUrl: string;
  stack: string[];
  features: string[];
}

export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  codeTitle?: string;
  codeSnippet?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  content: BlogSection[];
}
