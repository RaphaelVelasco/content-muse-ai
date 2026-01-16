import { useState } from "react";
import { Search, Filter, FileText, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentCard } from "@/components/dashboard/ContentCard";
import { ContentItem, ContentStatus } from "@/types/content";
import { cn } from "@/lib/utils";

const mockContents: ContentItem[] = [
  {
    id: '1',
    title: 'Como Dominar SEO em 2024: Guia Completo para Iniciantes',
    slug: 'como-dominar-seo-2024-guia-completo',
    metaDescription: 'Aprenda as técnicas essenciais de SEO para posicionar seu site no topo do Google.',
    content: '',
    source: 'youtube',
    keyword: 'SEO 2024',
    status: 'published',
    seoScore: { overall: 92, readability: 88, keywordDensity: 95, structure: 90, meta: 94 },
    toneOfVoice: 'educational',
    language: 'pt-BR',
    hasFAQ: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Marketing de Conteúdo: Estratégias que Geram Resultados',
    slug: 'marketing-conteudo-estrategias-resultados',
    metaDescription: 'Descubra as estratégias de marketing de conteúdo que realmente funcionam.',
    content: '',
    source: 'rss',
    keyword: 'marketing de conteúdo',
    status: 'reviewed',
    seoScore: { overall: 78, readability: 82, keywordDensity: 75, structure: 80, meta: 76 },
    toneOfVoice: 'professional',
    language: 'pt-BR',
    hasFAQ: false,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
  {
    id: '3',
    title: 'Inteligência Artificial para Negócios: Tendências e Aplicações',
    slug: 'inteligencia-artificial-negocios-tendencias',
    metaDescription: 'Explore como a IA está transformando os negócios.',
    content: '',
    source: 'keyword',
    keyword: 'IA para negócios',
    status: 'draft',
    seoScore: { overall: 65, readability: 70, keywordDensity: 60, structure: 68, meta: 62 },
    toneOfVoice: 'professional',
    language: 'pt-BR',
    hasFAQ: true,
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
  },
  {
    id: '4',
    title: 'Produtividade no Home Office: Dicas Práticas',
    slug: 'produtividade-home-office-dicas',
    metaDescription: 'Maximize sua produtividade trabalhando de casa.',
    content: '',
    source: 'youtube',
    keyword: 'home office',
    status: 'published',
    seoScore: { overall: 85, readability: 90, keywordDensity: 80, structure: 85, meta: 88 },
    toneOfVoice: 'educational',
    language: 'pt-BR',
    hasFAQ: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: '5',
    title: 'E-commerce em 2024: Tendências e Oportunidades',
    slug: 'ecommerce-2024-tendencias',
    metaDescription: 'As principais tendências do e-commerce para o próximo ano.',
    content: '',
    source: 'rss',
    keyword: 'e-commerce 2024',
    status: 'draft',
    seoScore: { overall: 55, readability: 60, keywordDensity: 50, structure: 58, meta: 52 },
    toneOfVoice: 'commercial',
    language: 'pt-BR',
    hasFAQ: false,
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11'),
  },
];

const statusFilters: { id: ContentStatus | 'all'; label: string; icon: typeof FileText }[] = [
  { id: 'all', label: 'Todos', icon: FileText },
  { id: 'draft', label: 'Rascunhos', icon: Clock },
  { id: 'reviewed', label: 'Revisados', icon: CheckCircle },
  { id: 'published', label: 'Publicados', icon: CheckCircle },
];

export function ContentHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ContentStatus | 'all'>('all');

  const filteredContents = mockContents.filter((content) => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.keyword.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || content.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: mockContents.length,
    draft: mockContents.filter((c) => c.status === 'draft').length,
    reviewed: mockContents.filter((c) => c.status === 'reviewed').length,
    published: mockContents.filter((c) => c.status === 'published').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Histórico de Conteúdos
        </h1>
        <p className="mt-1 text-muted-foreground">
          Gerencie todos os seus artigos gerados
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Status Filters */}
        <div className="flex gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                activeFilter === filter.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <filter.icon className="h-4 w-4" />
              {filter.label}
              <span className={cn(
                "rounded-full px-2 py-0.5 text-xs",
                activeFilter === filter.id
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}>
                {statusCounts[filter.id]}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título ou keyword..."
            className="h-10 w-full rounded-lg border border-border bg-secondary/50 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-4">
        {filteredContents.length > 0 ? (
          filteredContents.map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              onEdit={(id) => console.log('Edit:', id)}
              onDelete={(id) => console.log('Delete:', id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-foreground">
              Nenhum conteúdo encontrado
            </p>
            <p className="text-sm text-muted-foreground">
              Tente ajustar seus filtros ou termo de busca
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
