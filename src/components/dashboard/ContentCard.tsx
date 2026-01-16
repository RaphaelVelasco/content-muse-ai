import { MoreVertical, ExternalLink, Edit2, Trash2 } from "lucide-react";
import { ContentItem, ContentStatus } from "@/types/content";
import { SEOScoreRing } from "./SEOScoreRing";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  content: ContentItem;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const statusConfig: Record<ContentStatus, { label: string; className: string }> = {
  draft: { label: 'Rascunho', className: 'bg-muted text-muted-foreground' },
  reviewed: { label: 'Revisado', className: 'bg-yellow-400/10 text-yellow-400' },
  published: { label: 'Publicado', className: 'bg-green-400/10 text-green-400' },
};

const sourceLabels = {
  youtube: 'YouTube',
  rss: 'RSS Feed',
  keyword: 'Palavra-chave',
};

export function ContentCard({ content, onEdit, onDelete }: ContentCardProps) {
  const status = statusConfig[content.status];
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(content.createdAt);

  return (
    <div className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", status.className)}>
              {status.label}
            </span>
            <span className="text-xs text-muted-foreground">
              {sourceLabels[content.source]}
            </span>
          </div>
          
          <h3 className="font-display text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {content.title}
          </h3>
          
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {content.metaDescription}
          </p>
          
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1">
              🎯 {content.keyword}
            </span>
            <span>{formattedDate}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <SEOScoreRing score={content.seoScore.overall} size="sm" showLabel={false} />
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit?.(content.id)}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete?.(content.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
