
export interface GitHubConfig {
  username: string;
  repo: string;
  pat: string; // Personal Access Token (stored locally only)
  branch: string;
}

export interface Settings {
  siteTitle: string;
  logo: string;
  favicon: string;
  metaDescription: string;
  metaKeywords: string;
  metaAuthor: string;
  github?: GitHubConfig;
}

export interface HeroSection {
  title: string;
  name: string;
  subtitle: string;
  backgroundImage: string;
}

export interface AboutFeature {
  title: string;
  description: string;
}

export interface AboutSection {
  mainTitle: string;
  mainDescription: string;
  image: string;
  features: AboutFeature[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  year: string;
}

export interface SkillItem {
  id: string;
  name: string;
  percentage: number;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WorkCategory {
  id: string;
  name: string;
  filterClass: string; // e.g. 'item-1'
}

export interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  categoryId: string; // References WorkCategory.id
  image: string;
  largeImage: string; // For the lightbox
}

export interface ContactSection {
  address: string;
  phone: string;
  email: string;
  formActionUrl: string; // The Google Apps Script Web App URL for Contact Form
}

export interface PortfolioData {
  settings: Settings;
  hero: HeroSection;
  about: AboutSection;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  services: ServiceItem[];
  categories: WorkCategory[];
  works: WorkItem[];
  contact: ContactSection;
}
