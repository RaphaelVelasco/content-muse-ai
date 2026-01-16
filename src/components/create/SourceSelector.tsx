import { Youtube, Rss, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentSource } from "@/types/content";

interface SourceSelectorProps {
  selected: ContentSource | null;
  onSelect: (source: ContentSource) => void;
}

const sources = [
  {
    id: 'youtube' as ContentSource,
    icon: Youtube,
    title: 'YouTube',
    description: 'Extraia conteúdo semântico de vídeos ou canais completos',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    borderColor: 'border-red-400/30',
  },
  {
    id: 'rss' as ContentSource,
    icon: Rss,
    title: 'RSS Feed',
    description: 'Importe artigos de blogs e sites via feed RSS',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/30',
  },
  {
    id: 'keyword' as ContentSource,
    icon: Search,
    title: 'Palavra-chave',
    description: 'Gere conteúdo original a partir de uma palavra-chave',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/30',
  },
];

export function SourceSelector({ selected, onSelect }: SourceSelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {sources.map((source) => {
        const isSelected = selected === source.id;
        const Icon = source.icon;
        
        return (
          <button
            key={source.id}
            onClick={() => onSelect(source.id)}
            className={cn(
              "group relative flex flex-col items-center rounded-xl border-2 p-6 text-center transition-all duration-300",
              isSelected
                ? cn("border-primary bg-primary/5", source.borderColor)
                : "border-border bg-card hover:border-primary/30 hover:bg-secondary/50"
            )}
          >
            {isSelected && (
              <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary">
                <div className="flex h-full items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                </div>
              </div>
            )}
            
            <div className={cn(
              "rounded-xl p-4 transition-all duration-300",
              isSelected ? source.bgColor : "bg-secondary group-hover:bg-muted"
            )}>
              <Icon className={cn(
                "h-8 w-8 transition-colors",
                isSelected ? source.color : "text-muted-foreground group-hover:text-foreground"
              )} />
            </div>
            
            <h3 className={cn(
              "mt-4 font-display text-lg font-semibold transition-colors",
              isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
            )}>
              {source.title}
            </h3>
            
            <p className="mt-2 text-sm text-muted-foreground">
              {source.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}
