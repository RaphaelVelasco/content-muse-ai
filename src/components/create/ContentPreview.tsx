import { SEOScoreRing } from "@/components/dashboard/SEOScoreRing";
import { Check, AlertCircle, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { GeneratedContentData } from "@/types/content";

interface ContentPreviewProps {
  content: {
    title: string;
    slug: string;
    metaDescription: string;
    body: string;
    keyword?: string;
    categoryId?: number;
    tagIds?: number[] | string;
    featuredMediaId?: number | null;
    featuredImageUrl?: string;
  };
  seoScore: {
    overall: number;
    readability: number;
    keywordDensity: number;
    structure: number;
    meta: number;
  };
  onContentChange?: (content: GeneratedContentData) => void;
  onCopy?: () => void;
  onExport?: () => void;
}

interface ScoreItemProps {
  label: string;
  score: number;
}

function ScoreItem({ label, score }: ScoreItemProps) {
  const getStatus = (score: number) => {
    if (score >= 80) return { icon: Check, color: "text-green-400", bg: "bg-green-400" };
    if (score >= 60) return { icon: Check, color: "text-yellow-400", bg: "bg-yellow-400" };
    return { icon: AlertCircle, color: "text-red-400", bg: "bg-red-400" };
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

const inputClass =
  "w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all";

export function ContentPreview({
  content,
  seoScore,
  onContentChange,
  onCopy,
  onExport,
}: ContentPreviewProps) {
  const isEditable = !!onContentChange;

  const handleFieldChange = (field: keyof GeneratedContentData, value: string | number | number[] | null) => {
    if (!onContentChange) return;
    onContentChange({
      ...content,
      [field]: value,
    } as GeneratedContentData);
  };

  const tagDisplay =
    typeof content.tagIds === "string"
      ? content.tagIds
      : Array.isArray(content.tagIds)
        ? content.tagIds.join(", ")
        : "";

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        {/* Meta Info */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            Meta Informações
          </h3>

          <div className="space-y-4">
            <div>
              <Label className="block text-xs font-medium text-muted-foreground mb-1">
                Título SEO
              </Label>
              {isEditable ? (
                <Input
                  value={content.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  className={inputClass}
                  maxLength={100}
                />
              ) : (
                <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 px-4 py-3">
                  <span className="text-foreground">{content.title}</span>
                </div>
              )}
              <span
                className={cn(
                  "text-xs font-medium mt-1 block",
                  content.title.length <= 60 ? "text-green-400" : "text-yellow-400"
                )}
              >
                {content.title.length}/60
              </span>
            </div>

            <div>
              <Label className="block text-xs font-medium text-muted-foreground mb-1">Slug</Label>
              {isEditable ? (
                <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 overflow-hidden">
                  <span className="pl-4 text-muted-foreground shrink-0">/blog/</span>
                  <Input
                    value={content.slug}
                    onChange={(e) => handleFieldChange("slug", e.target.value)}
                    className="border-0 bg-transparent focus-visible:ring-0"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-3">
                  <span className="text-muted-foreground">/blog/</span>
                  <span className="text-foreground">{content.slug}</span>
                </div>
              )}
            </div>

            <div>
              <Label className="block text-xs font-medium text-muted-foreground mb-1">
                Meta Description
              </Label>
              {isEditable ? (
                <textarea
                  value={content.metaDescription}
                  onChange={(e) => handleFieldChange("metaDescription", e.target.value)}
                  className={cn(inputClass, "min-h-[80px] resize-y")}
                  maxLength={200}
                />
              ) : (
                <div className="rounded-lg border border-border bg-secondary/50 px-4 py-3">
                  <span className="text-foreground text-sm">{content.metaDescription}</span>
                </div>
              )}
              <span
                className={cn(
                  "text-xs font-medium mt-1 block",
                  content.metaDescription.length <= 160 ? "text-green-400" : "text-yellow-400"
                )}
              >
                {content.metaDescription.length}/160
              </span>
            </div>

            {(content.categoryId != null || tagDisplay) && (
              <div className="grid grid-cols-2 gap-4 pt-2">
                {content.categoryId != null && (
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">Categoria (ID)</Label>
                    <p className="text-sm text-foreground mt-1">{content.categoryId}</p>
                  </div>
                )}
                {tagDisplay && (
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">Tags</Label>
                    <p className="text-sm text-foreground mt-1 break-all">{tagDisplay}</p>
                  </div>
                )}
              </div>
            )}

            {content.featuredImageUrl && (
              <div className="pt-2">
                <Label className="text-xs font-medium text-muted-foreground block mb-2">
                  Imagem de destaque
                </Label>
                <img
                  src={content.featuredImageUrl}
                  alt="Destaque"
                  className="rounded-lg border border-border max-h-48 object-cover w-full"
                />
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-foreground">Conteúdo</h3>
            <div className="flex gap-2">
              {onCopy && (
                <Button variant="ghost" size="sm" onClick={onCopy}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar
                </Button>
              )}
              {onExport && (
                <Button variant="ghost" size="sm" onClick={onExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              )}
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
