import { FileText, TrendingUp, Eye, PenTool, Plus } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ContentCard } from "@/components/dashboard/ContentCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Button } from "@/components/ui/button";
import { ContentItem } from "@/types/content";

const mockContents: ContentItem[] = [
  {
    id: '1',
    title: 'Como Dominar SEO em 2024: Guia Completo para Iniciantes',
    slug: 'como-dominar-seo-2024-guia-completo',
    metaDescription: 'Aprenda as técnicas essenciais de SEO para posicionar seu site no topo do Google. Guia atualizado com as melhores práticas de 2024.',
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
    metaDescription: 'Descubra as estratégias de marketing de conteúdo que realmente funcionam para aumentar o tráfego orgânico do seu blog.',
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
    metaDescription: 'Explore como a IA está transformando os negócios e descubra as principais tendências para os próximos anos.',
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
];

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie seus conteúdos e acompanhe o desempenho
          </p>
        </div>
        <Button variant="gradient" size="lg" onClick={() => onNavigate('create')}>
          <Plus className="h-5 w-5 mr-2" />
          Novo Conteúdo
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Conteúdos"
          value={47}
          change="+12 este mês"
          changeType="positive"
          icon={FileText}
        />
        <StatsCard
          title="Publicados"
          value={32}
          change="68% do total"
          changeType="neutral"
          icon={TrendingUp}
        />
        <StatsCard
          title="Visualizações"
          value="24.5K"
          change="+18% vs mês anterior"
          changeType="positive"
          icon={Eye}
        />
        <StatsCard
          title="Em Rascunho"
          value={8}
          change="Aguardando revisão"
          changeType="neutral"
          icon={PenTool}
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Contents */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Conteúdos Recentes
            </h2>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('history')}>
              Ver todos
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockContents.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                onEdit={(id) => console.log('Edit:', id)}
                onDelete={(id) => console.log('Delete:', id)}
              />
            ))}
          </div>
        </div>

        {/* Activity & Quick Actions */}
        <div className="space-y-4">
          <RecentActivity />
          
          {/* Quick Tips */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💡</span>
              <h3 className="font-display font-semibold text-foreground">
                Dica do Dia
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Use palavras-chave de cauda longa para melhorar suas chances de rankeamento.
              Elas têm menos competição e intenção de busca mais específica.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
