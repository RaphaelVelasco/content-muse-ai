export type ContentSource = 'youtube' | 'rss' | 'keyword';

export type ContentStatus = 'draft' | 'reviewed' | 'published';

export type ToneOfVoice = 'professional' | 'educational' | 'institutional' | 'commercial';

/** Status da execução no n8n / planilha */
export type ExecutionStatus = 'PENDENTE' | 'EXECUTANDO' | 'CONCLUÍDO' | 'ERRO';

/** Banco de imagem usado no fluxo n8n */
export type ImageBank =
  | 'Dall-e'
  | 'Flux'
  | 'LeonardoAI'
  | 'Midjourney'
  | 'Pollinations'
  | 'Freepik'
  | 'Fonte'
  | 'Reconhecimento'
  | 'Sem imagem';

/** Imagem no subtítulo */
export type ImageInSubtitle = 'NÃO' | 'SIM em Todos' | 'SIM, mas intercalando';

/** Status do post ao publicar */
export type PostStatusOption = 'Rascunho' | 'Publicado';

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
  /** ID da execução no n8n (para link "Ver execução") */
  executionId?: string;
  /** URL da execução no n8n */
  n8nExecutionUrl?: string;
  /** Status na planilha */
  executionStatus?: ExecutionStatus;
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
  // --- Campos alinhados ao n8n (variaveis) ---
  siteUrl: string;
  postStatus: PostStatusOption;
  imageBank: ImageBank;
  imageInSubtitle: ImageInSubtitle;
  conclusion: boolean;
  postLinkInterno: boolean;
  videoYoutube: boolean;
  reference: boolean;
  resumo: boolean;
  // Avançadas (planilha, WordPress custom, marcas d'água)
  planilhaId: string;
  planilhaAba: string;
  customPostType: string;
  customTaxonomia: string;
  logoMarcaDaguaUrl: string;
  overlayMarcaDaguaUrl: string;
}

export interface GeneratedContentData {
  title: string;
  slug: string;
  metaDescription: string;
  body: string;
  keyword?: string;
  categoryId?: number;
  tagIds?: number[] | string;
  featuredMediaId?: number | null;
  featuredImageUrl?: string;
  seoScore?: SEOScore;
}

export interface WizardStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

/** Payload enviado ao webhook n8n para iniciar geração */
export interface N8nTriggerPayload {
  source: ContentSource;
  sourceInput: string;
  keyword: string;
  toneOfVoice: ToneOfVoice;
  persona: string;
  niche: string;
  language: string;
  generateFAQ: boolean;
  siteUrl: string;
  postStatus: PostStatusOption;
  imageBank: ImageBank;
  imageInSubtitle: ImageInSubtitle;
  conclusion: boolean;
  postLinkInterno: boolean;
  videoYoutube: boolean;
  reference: boolean;
  resumo: boolean;
  planilhaId: string;
  planilhaAba: string;
  customPostType: string;
  customTaxonomia: string;
  logoMarcaDaguaUrl: string;
  overlayMarcaDaguaUrl: string;
}

/** Resposta do webhook n8n (ou mock) */
export interface N8nTriggerResponse {
  success: boolean;
  executionId?: string;
  content?: GeneratedContentData;
  error?: string;
}
