import { ContentSource, ToneOfVoice } from "@/types/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfigFormProps {
  source: ContentSource;
  config: {
    sourceInput: string;
    keyword: string;
    toneOfVoice: ToneOfVoice;
    persona: string;
    niche: string;
    language: string;
    generateFAQ: boolean;
  };
  onChange: (field: string, value: string | boolean) => void;
}

const toneOptions: { id: ToneOfVoice; label: string; description: string }[] = [
  { id: 'professional', label: 'Profissional', description: 'Tom formal e corporativo' },
  { id: 'educational', label: 'Educativo', description: 'Didático e explicativo' },
  { id: 'institutional', label: 'Institucional', description: 'Comunicação oficial' },
  { id: 'commercial', label: 'Comercial', description: 'Persuasivo e vendedor' },
];

const languageOptions = [
  { id: 'pt-BR', label: 'Português (Brasil)' },
  { id: 'en-US', label: 'English (US)' },
  { id: 'es', label: 'Español' },
];

export function ConfigForm({ source, config, onChange }: ConfigFormProps) {
  const sourceLabels = {
    youtube: { placeholder: 'Cole o link do vídeo ou canal do YouTube', label: 'URL do YouTube' },
    rss: { placeholder: 'Cole a URL do feed RSS', label: 'URL do Feed RSS' },
    keyword: { placeholder: 'Digite a palavra-chave principal', label: 'Palavra-chave' },
  };

  const sourceConfig = sourceLabels[source];

  return (
    <div className="space-y-6">
      {/* Source Input */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {sourceConfig.label}
        </label>
        <input
          type="text"
          value={config.sourceInput}
          onChange={(e) => onChange('sourceInput', e.target.value)}
          placeholder={sourceConfig.placeholder}
          className="w-full h-12 rounded-lg border border-border bg-secondary/50 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      {/* Keyword (if not keyword source) */}
      {source !== 'keyword' && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Palavra-chave Principal
          </label>
          <input
            type="text"
            value={config.keyword}
            onChange={(e) => onChange('keyword', e.target.value)}
            placeholder="Ex: marketing digital, SEO, produtividade"
            className="w-full h-12 rounded-lg border border-border bg-secondary/50 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      )}

      {/* Tone of Voice */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Tom de Voz
        </label>
        <div className="grid grid-cols-2 gap-3">
          {toneOptions.map((tone) => (
            <button
              key={tone.id}
              type="button"
              onClick={() => onChange('toneOfVoice', tone.id)}
              className={cn(
                "flex flex-col items-start rounded-lg border p-4 text-left transition-all",
                config.toneOfVoice === tone.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/30"
              )}
            >
              <span className="font-medium text-foreground">{tone.label}</span>
              <span className="text-xs text-muted-foreground">{tone.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Persona & Niche */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Persona
          </label>
          <input
            type="text"
            value={config.persona}
            onChange={(e) => onChange('persona', e.target.value)}
            placeholder="Ex: Empreendedores digitais"
            className="w-full h-12 rounded-lg border border-border bg-secondary/50 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nicho
          </label>
          <input
            type="text"
            value={config.niche}
            onChange={(e) => onChange('niche', e.target.value)}
            placeholder="Ex: Marketing, Tecnologia"
            className="w-full h-12 rounded-lg border border-border bg-secondary/50 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Language */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Idioma
        </label>
        <select
          value={config.language}
          onChange={(e) => onChange('language', e.target.value)}
          className="w-full h-12 rounded-lg border border-border bg-secondary/50 px-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
        >
          {languageOptions.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Generate FAQ */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
        <div>
          <p className="font-medium text-foreground">Gerar FAQ Automático</p>
          <p className="text-sm text-muted-foreground">
            Adiciona seção de perguntas frequentes quando relevante
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange('generateFAQ', !config.generateFAQ)}
          className={cn(
            "relative h-6 w-11 rounded-full transition-colors",
            config.generateFAQ ? "bg-primary" : "bg-muted"
          )}
        >
          <span
            className={cn(
              "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
              config.generateFAQ && "translate-x-5"
            )}
          />
        </button>
      </div>
    </div>
  );
}
