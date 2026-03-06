import { useState, useCallback } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WizardProgress } from "@/components/create/WizardProgress";
import { SourceSelector } from "@/components/create/SourceSelector";
import { ConfigForm } from "@/components/create/ConfigForm";
import { ContentPreview } from "@/components/create/ContentPreview";
import { GeneratingState } from "@/components/create/GeneratingState";
import {
  ContentSource,
  ToneOfVoice,
  WizardStep,
  ContentGenerationConfig,
  GeneratedContentData,
  N8nTriggerPayload,
} from "@/types/content";
import { triggerGeneration, publishOrSaveDraft } from "@/lib/n8nApi";
import { toast } from "@/hooks/use-toast";

const wizardSteps: WizardStep[] = [
  { id: 1, title: "Fonte", description: "Escolha a origem", isCompleted: false, isCurrent: true },
  { id: 2, title: "Configuração", description: "Defina parâmetros", isCompleted: false, isCurrent: false },
  { id: 3, title: "Geração", description: "IA trabalhando", isCompleted: false, isCurrent: false },
  { id: 4, title: "Revisão", description: "Ajuste e publique", isCompleted: false, isCurrent: false },
];

const defaultConfig: ContentGenerationConfig = {
  source: "rss",
  sourceInput: "",
  keyword: "",
  toneOfVoice: "professional",
  persona: "",
  niche: "",
  language: "pt-BR",
  generateFAQ: true,
  siteUrl: "",
  postStatus: "Rascunho",
  imageBank: "Dall-e",
  imageInSubtitle: "NÃO",
  conclusion: true,
  postLinkInterno: false,
  videoYoutube: true,
  reference: true,
  resumo: true,
  planilhaId: "",
  planilhaAba: "0",
  customPostType: "",
  customTaxonomia: "",
  logoMarcaDaguaUrl: "",
  overlayMarcaDaguaUrl: "",
};

function configToPayload(config: ContentGenerationConfig): N8nTriggerPayload {
  return {
    source: config.source,
    sourceInput: config.sourceInput,
    keyword: config.keyword,
    toneOfVoice: config.toneOfVoice,
    persona: config.persona,
    niche: config.niche,
    language: config.language,
    generateFAQ: config.generateFAQ,
    siteUrl: config.siteUrl,
    postStatus: config.postStatus,
    imageBank: config.imageBank,
    imageInSubtitle: config.imageInSubtitle,
    conclusion: config.conclusion,
    postLinkInterno: config.postLinkInterno,
    videoYoutube: config.videoYoutube,
    reference: config.reference,
    resumo: config.resumo,
    planilhaId: config.planilhaId,
    planilhaAba: config.planilhaAba,
    customPostType: config.customPostType,
    customTaxonomia: config.customTaxonomia,
    logoMarcaDaguaUrl: config.logoMarcaDaguaUrl,
    overlayMarcaDaguaUrl: config.overlayMarcaDaguaUrl,
  };
}

interface CreateContentProps {
  onNavigate: (page: string) => void;
}

export function CreateContent({ onNavigate }: CreateContentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSource, setSelectedSource] = useState<ContentSource | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [config, setConfig] = useState<ContentGenerationConfig>({
    ...defaultConfig,
  });

  const handleSelectSource = (source: ContentSource) => {
    setSelectedSource(source);
    setConfig((prev) => ({ ...prev, source }));
  };
  const [generatedContent, setGeneratedContent] = useState<GeneratedContentData | null>(null);
  const [executionId, setExecutionId] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleConfigChange = (field: keyof ContentGenerationConfig, value: string | boolean) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const startGeneration = useCallback(async () => {
    if (!selectedSource) return;
    setGenerationError(null);
    setIsGenerating(true);
    setCurrentStep(2);
    const payload = configToPayload({ ...config, source: selectedSource });
    try {
      const result = await triggerGeneration(payload);
      if (result.success && result.content) {
        setGeneratedContent(result.content);
        if (result.executionId) setExecutionId(result.executionId);
        setIsGenerating(false);
        setCurrentStep(3);
        if (!import.meta.env.VITE_N8N_WEBHOOK_URL) {
          toast({
            title: "Modo demo",
            description: "Configure VITE_N8N_WEBHOOK_URL no .env para conectar ao n8n.",
          });
        }
      } else {
        setGenerationError(result.error ?? "Erro ao gerar conteúdo");
        setIsGenerating(false);
        toast({
          title: "Erro na geração",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro inesperado";
      setGenerationError(message);
      setIsGenerating(false);
      toast({
        title: "Erro",
        description: message,
        variant: "destructive",
      });
    }
  }, [config, selectedSource]);

  const handleNext = () => {
    if (currentStep === 1) {
      startGeneration();
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, wizardSteps.length - 1));
    }
  };

  const handleBack = () => {
    if (currentStep === 2 && !isGenerating) {
      setCurrentStep(1);
    } else if (currentStep > 0 && !isGenerating) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleGenerationComplete = useCallback(() => {
    setIsGenerating(false);
    setCurrentStep(3);
  }, []);

  const handleContentUpdate = useCallback((updated: GeneratedContentData) => {
    setGeneratedContent((prev) => (prev ? { ...prev, ...updated } : updated));
  }, []);

  const handleSaveDraft = async () => {
    if (!generatedContent) return;
    setIsPublishing(true);
    try {
      const result = await publishOrSaveDraft(generatedContent, "draft");
      if (result.success) {
        toast({ title: "Rascunho salvo", description: "O conteúdo foi salvo como rascunho." });
        onNavigate("history");
      } else {
        toast({ title: "Erro ao salvar", description: result.error, variant: "destructive" });
      }
    } finally {
      setIsPublishing(false);
    }
  };

  const handlePublish = async () => {
    if (!generatedContent) return;
    setIsPublishing(true);
    try {
      const result = await publishOrSaveDraft(generatedContent, "publish");
      if (result.success) {
        toast({
          title: "Artigo publicado",
          description: result.link ? `Disponível em: ${result.link}` : "Publicado com sucesso.",
        });
        onNavigate("history");
      } else {
        toast({ title: "Erro ao publicar", description: result.error, variant: "destructive" });
      }
    } finally {
      setIsPublishing(false);
    }
  };

  const canProceed = () => {
    if (currentStep === 0) return selectedSource !== null;
    if (currentStep === 1) return config.sourceInput.trim() !== "";
    return true;
  };

  const previewContent = generatedContent
    ? {
        title: generatedContent.title,
        slug: generatedContent.slug,
        metaDescription: generatedContent.metaDescription,
        body: generatedContent.body,
        keyword: generatedContent.keyword,
        categoryId: generatedContent.categoryId,
        tagIds: generatedContent.tagIds,
        featuredMediaId: generatedContent.featuredMediaId,
        featuredImageUrl: generatedContent.featuredImageUrl,
      }
    : null;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Escolha a fonte do conteúdo
              </h2>
              <p className="mt-2 text-muted-foreground">
                Selecione de onde a IA irá extrair as informações para criar seu artigo
              </p>
            </div>
            <SourceSelector selected={selectedSource} onSelect={handleSelectSource} />
          </div>
        );

      case 1:
        return (
          <div className="animate-fade-in max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Configure seu conteúdo
              </h2>
              <p className="mt-2 text-muted-foreground">
                Defina os parâmetros para a geração do artigo
              </p>
            </div>
            <ConfigForm
              source={selectedSource!}
              config={config}
              onChange={handleConfigChange}
            />
          </div>
        );

      case 2:
        return (
          <div className="animate-fade-in">
            <GeneratingState
              onComplete={handleGenerationComplete}
              error={generationError}
              isComplete={!!generatedContent && !isGenerating}
              onBack={() => setCurrentStep(1)}
            />
          </div>
        );

      case 3:
        return previewContent ? (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Revise seu conteúdo
              </h2>
              <p className="mt-2 text-muted-foreground">
                Confira o artigo gerado e faça ajustes antes de publicar
              </p>
            </div>
            <ContentPreview
              content={previewContent}
              seoScore={
                generatedContent?.seoScore ?? {
                  overall: 75,
                  readability: 80,
                  keywordDensity: 70,
                  structure: 78,
                  meta: 72,
                }
              }
              onContentChange={handleContentUpdate}
              onCopy={() => {
                navigator.clipboard.writeText(generatedContent?.body ?? "");
                toast({ title: "Copiado", description: "Conteúdo copiado para a área de transferência." });
              }}
              onExport={() => {
                const blob = new Blob([generatedContent?.body ?? ""], { type: "text/html" });
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = `${generatedContent?.slug ?? "artigo"}.html`;
                a.click();
                URL.revokeObjectURL(a.href);
                toast({ title: "Exportado", description: "Arquivo HTML baixado." });
              }}
            />
          </div>
        ) : (
          <div className="py-12 text-center text-muted-foreground">
            Nenhum conteúdo gerado. Volte e clique em &quot;Gerar Conteúdo&quot;.
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("dashboard")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Criar Novo Conteúdo
          </h1>
          <p className="text-sm text-muted-foreground">
            Siga os passos para gerar seu artigo otimizado
          </p>
        </div>
      </div>

      <WizardProgress steps={wizardSteps} currentStep={currentStep} />

      <div className="rounded-xl border border-border bg-card p-6 lg:p-8">
        {renderStepContent()}
      </div>

      {currentStep !== 2 && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          {currentStep < 3 ? (
            <Button
              variant="gradient"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {currentStep === 1 ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Gerar Conteúdo
                </>
              ) : (
                <>
                  Próximo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isPublishing}
              >
                Salvar Rascunho
              </Button>
              <Button
                variant="gradient"
                onClick={handlePublish}
                disabled={isPublishing}
              >
                Publicar Artigo
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
