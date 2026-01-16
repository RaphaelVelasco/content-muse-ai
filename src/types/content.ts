export type ContentSource = 'youtube' | 'rss' | 'keyword';

export type ContentStatus = 'draft' | 'reviewed' | 'published';

export type ToneOfVoice = 'professional' | 'educational' | 'institutional' | 'commercial';

export interface SEOScore {
  overall: number;
  readability: number;
  keywordDensity: number;
  structure: number;
  meta: number;
}

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  metaDescription: string;
  content: string;
  source: ContentSource;
  sourceUrl?: string;
  keyword: string;
  status: ContentStatus;
  seoScore: SEOScore;
  toneOfVoice: ToneOfVoice;
  persona?: string;
  niche?: string;
  language: string;
  hasFAQ: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentGenerationConfig {
  source: ContentSource;
  sourceInput: string;
  keyword: string;
  toneOfVoice: ToneOfVoice;
  persona: string;
  niche: string;
  language: string;
  generateFAQ: boolean;
}

export interface WizardStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isCurrent: boolean;
}
