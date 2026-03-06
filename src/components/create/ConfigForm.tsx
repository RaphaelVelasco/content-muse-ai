import {
  ContentSource,
  ToneOfVoice,
  ContentGenerationConfig,
  ImageBank,
  ImageInSubtitle,
  PostStatusOption,
} from "@/types/content";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ConfigFormProps {
  source: ContentSource;
  config: ContentGenerationConfig;
  onChange: (field: keyof ContentGenerationConfig, value: string | boolean) => void;
}

const toneOptions: { id: ToneOfVoice; label: string; description: string }[] = [
  { id: "professional", label: "Profissional", description: "Tom formal e corporativo" },
  { id: "educational", label: "Educativo", description: "Didático e explicativo" },
  { id: "institutional", label: "Institucional", description: "Comunicação oficial" },
  { id: "commercial", label: "Comercial", description: "Persuasivo e vendedor" },
];

const languageOptions = [
  { id: "pt-BR", label: "Português (Brasil)" },
  { id: "en-US", label: "English (US)" },
  { id: "es", label: "Español" },
];

const imageBankOptions: { id: ImageBank; label: string }[] = [
  { id: "Dall-e", label: "Dall-e" },
  { id: "Flux", label: "Flux" },
  { id: "LeonardoAI", label: "Leonardo AI" },
  { id: "Midjourney", label: "Midjourney" },
  { id: "Pollinations", label: "Pollinations" },
  { id: "Freepik", label: "Freepik" },
  { id: "Fonte", label: "Fonte" },
  { id: "Reconhecimento", label: "Reconhecimento" },
  { id: "Sem imagem", label: "Sem imagem" },
];

const imageInSubtitleOptions: { id: ImageInSubtitle; label: string }[] = [
  { id: "NÃO", label: "Não" },
  { id: "SIM em Todos", label: "SIM em todos" },
  { id: "SIM, mas intercalando", label: "SIM, mas intercalando" },
];

const postStatusOptions: { id: PostStatusOption; label: string }[] = [
  { id: "Rascunho", label: "Rascunho" },
  { id: "Publicado", label: "Publicado" },
];

const inputClass =
  "w-full h-12 rounded-lg border border-border bg-secondary/50 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all";

export function ConfigForm({ source, config, onChange }: ConfigFormProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const sourceLabels = {
    youtube: {
      placeholder: "Cole o link do vídeo ou canal do YouTube",
      label: "URL do YouTube",
    },
    rss: {
      placeholder: "Cole a URL do feed RSS",
      label: "URL do Feed RSS",
    },
    keyword: {
      placeholder: "Digite a palavra-chave principal",
      label: "Palavra-chave",
    },
  };

  const sourceConfig = sourceLabels[source];

  return (
    <div className="space-y-6">
      {/* URL do Site */}
      <div>
        <Label className="mb-2">URL do Site (WordPress)</Label>
        <input
          type="url"
          value={config.siteUrl}
          onChange={(e) => onChange("siteUrl", e.target.value)}
          placeholder="https://seusite.com.br"
          className={inputClass}
        />
      </div>

      {/* Source Input */}
      <div>
        <Label className="mb-2">{sourceConfig.label}</Label>
        <input
          type="text"
          value={config.sourceInput}
          onChange={(e) => onChange("sourceInput", e.target.value)}
          placeholder={sourceConfig.placeholder}
          className={inputClass}
        />
      </div>

      {source !== "keyword" && (
        <div>
          <Label className="mb-2">Palavra-chave Principal</Label>
          <input
            type="text"
            value={config.keyword}
            onChange={(e) => onChange("keyword", e.target.value)}
            placeholder="Ex: marketing digital, SEO, produtividade"
            className={inputClass}
          />
        </div>
      )}

      {/* Tom de Voz */}
      <div>
        <Label className="mb-3 block">Tom de Voz</Label>
        <div className="grid grid-cols-2 gap-3">
          {toneOptions.map((tone) => (
            <button
              key={tone.id}
              type="button"
              onClick={() => onChange("toneOfVoice", tone.id)}
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2">Persona</Label>
          <input
            type="text"
            value={config.persona}
            onChange={(e) => onChange("persona", e.target.value)}
            placeholder="Ex: Empreendedores digitais"
            className={inputClass}
          />
        </div>
        <div>
          <Label className="mb-2">Nicho</Label>
          <input
            type="text"
            value={config.niche}
            onChange={(e) => onChange("niche", e.target.value)}
            placeholder="Ex: Marketing, Tecnologia"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <Label className="mb-2">Idioma</Label>
        <select
          value={config.language}
          onChange={(e) => onChange("language", e.target.value)}
          className={inputClass}
        >
          {languageOptions.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Post Status */}
      <div>
        <Label className="mb-2">Status do Post</Label>
        <div className="flex gap-3">
          {postStatusOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange("postStatus", opt.id)}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                config.postStatus === opt.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary/30"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Banco de imagem */}
      <div>
        <Label className="mb-2">Banco de imagem</Label>
        <select
          value={config.imageBank}
          onChange={(e) => onChange("imageBank", e.target.value as ImageBank)}
          className={inputClass}
        >
          {imageBankOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Imagem no subtítulo? */}
      <div>
        <Label className="mb-2">Imagem no subtítulo?</Label>
        <select
          value={config.imageInSubtitle}
          onChange={(e) =>
            onChange("imageInSubtitle", e.target.value as ImageInSubtitle)
          }
          className={inputClass}
        >
          {imageInSubtitleOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Switches: FAQ, Conclusion, etc. */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Gerar FAQ</p>
            <p className="text-sm text-muted-foreground">
              Adiciona seção de perguntas frequentes
            </p>
          </div>
          <Switch
            checked={config.generateFAQ}
            onCheckedChange={(v) => onChange("generateFAQ", v)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Conclusão</p>
            <p className="text-sm text-muted-foreground">
              Incluir parágrafo de conclusão no artigo
            </p>
          </div>
          <Switch
            checked={config.conclusion}
            onCheckedChange={(v) => onChange("conclusion", v)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Resumo</p>
            <p className="text-sm text-muted-foreground">
              Incluir resumo/summarization no conteúdo
            </p>
          </div>
          <Switch
            checked={config.resumo}
            onCheckedChange={(v) => onChange("resumo", v)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Link interno</p>
            <p className="text-sm text-muted-foreground">
              Incluir link interno no post (keyword)
            </p>
          </div>
          <Switch
            checked={config.postLinkInterno}
            onCheckedChange={(v) => onChange("postLinkInterno", v)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Vídeo YouTube</p>
            <p className="text-sm text-muted-foreground">
              Incluir vídeo do YouTube quando disponível na fonte
            </p>
          </div>
          <Switch
            checked={config.videoYoutube}
            onCheckedChange={(v) => onChange("videoYoutube", v)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Referência (Fonte)</p>
            <p className="text-sm text-muted-foreground">
              Incluir link "Fonte: [origem]" no final do artigo
            </p>
          </div>
          <Switch
            checked={config.reference}
            onCheckedChange={(v) => onChange("reference", v)}
          />
        </div>
      </div>

      {/* Configurações avançadas */}
      <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-border bg-secondary/30 px-4 py-3 text-left font-medium text-foreground hover:bg-secondary/50">
          Configurações avançadas (planilha, WordPress, marcas d&apos;água)
          {advancedOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-4">
          <div>
            <Label className="mb-2">Planilha ID (Google Sheets)</Label>
            <input
              type="text"
              value={config.planilhaId}
              onChange={(e) => onChange("planilhaId", e.target.value)}
              placeholder="ID da planilha"
              className={inputClass}
            />
          </div>
          <div>
            <Label className="mb-2">Planilha Aba</Label>
            <input
              type="text"
              value={config.planilhaAba}
              onChange={(e) => onChange("planilhaAba", e.target.value)}
              placeholder="0 ou nome da aba"
              className={inputClass}
            />
          </div>
          <div>
            <Label className="mb-2">Custom Post Type (WordPress)</Label>
            <input
              type="text"
              value={config.customPostType}
              onChange={(e) => onChange("customPostType", e.target.value)}
              placeholder="Vazio = posts"
              className={inputClass}
            />
          </div>
          <div>
            <Label className="mb-2">Custom Taxonomia (categorias)</Label>
            <input
              type="text"
              value={config.customTaxonomia}
              onChange={(e) => onChange("customTaxonomia", e.target.value)}
              placeholder="Vazio = categories"
              className={inputClass}
            />
          </div>
          <div>
            <Label className="mb-2">Logo marca d&apos;água (URL)</Label>
            <input
              type="url"
              value={config.logoMarcaDaguaUrl}
              onChange={(e) => onChange("logoMarcaDaguaUrl", e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
          <div>
            <Label className="mb-2">Marca d&apos;água Overlay (URL)</Label>
            <input
              type="url"
              value={config.overlayMarcaDaguaUrl}
              onChange={(e) => onChange("overlayMarcaDaguaUrl", e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
