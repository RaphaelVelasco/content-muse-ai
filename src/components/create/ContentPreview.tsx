import { SEOScoreRing } from "@/components/dashboard/SEOScoreRing";
import { Check, AlertCircle, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContentPreviewProps {
  content: {
    title: string;
    slug: string;
    metaDescription: string;
    body: string;
  };
  seoScore: {
    overall: number;
    readability: number;
    keywordDensity: number;
    structure: number;
    meta: number;
  };
}

interface ScoreItemProps {
  label: string;
  score: number;
}

function ScoreItem({ label, score }: ScoreItemProps) {
  const getStatus = (score: number) => {
    if (score >= 80) return { icon: Check, color: 'text-green-400', bg: 'bg-green-400' };
    if (score >= 60) return { icon: Check, color: 'text-yellow-400', bg: 'bg-yellow-400' };
    return { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400' };
  };

  const status = getStatus(score);
  const Icon = status.icon;

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <Icon className={cn("h-4 w-4", status.color)} />
        <span className="text-sm text-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all duration-500", status.bg)}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className={cn("text-sm font-medium w-8 text-right", status.color)}>{score}</span>
      </div>
    </div>
  );
}

export function ContentPreview({ content, seoScore }: ContentPreviewProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Content Preview */}
      <div className="lg:col-span-2 space-y-4">
        {/* Meta Info */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            Meta Informações
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Título SEO
              </label>
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 px-4 py-3">
                <span className="text-foreground">{content.title}</span>
                <span className={cn(
                  "text-xs font-medium",
                  content.title.length <= 60 ? "text-green-400" : "text-yellow-400"
                )}>
                  {content.title.length}/60
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Slug
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-3">
                <span className="text-muted-foreground">/blog/</span>
                <span className="text-foreground">{content.slug}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Meta Description
              </label>
              <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-secondary/50 px-4 py-3">
                <span className="text-foreground text-sm">{content.metaDescription}</span>
                <span className={cn(
                  "text-xs font-medium whitespace-nowrap",
                  content.metaDescription.length <= 160 ? "text-green-400" : "text-yellow-400"
                )}>
                  {content.metaDescription.length}/160
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Conteúdo
            </h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copiar
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
          
          <div 
            className="prose prose-invert prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: content.body }}
          />
        </div>
      </div>

      {/* SEO Score Panel */}
      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-6 text-center">
            Análise SEO
          </h3>
          
          <div className="flex justify-center mb-6">
            <SEOScoreRing score={seoScore.overall} size="lg" />
          </div>
          
          <div className="space-y-1 divide-y divide-border">
            <ScoreItem label="Legibilidade" score={seoScore.readability} />
            <ScoreItem label="Densidade de Keywords" score={seoScore.keywordDensity} />
            <ScoreItem label="Estrutura" score={seoScore.structure} />
            <ScoreItem label="Meta Tags" score={seoScore.meta} />
          </div>
        </div>

        {/* Tips */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h4 className="font-medium text-foreground mb-3">💡 Dicas de Melhoria</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400">•</span>
              Adicione mais links internos para melhorar a navegação
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              Título otimizado com palavra-chave principal
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              Meta description dentro do limite recomendado
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
