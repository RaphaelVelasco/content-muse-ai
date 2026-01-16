import { useState, useCallback } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WizardProgress } from "@/components/create/WizardProgress";
import { SourceSelector } from "@/components/create/SourceSelector";
import { ConfigForm } from "@/components/create/ConfigForm";
import { ContentPreview } from "@/components/create/ContentPreview";
import { GeneratingState } from "@/components/create/GeneratingState";
import { ContentSource, ToneOfVoice, WizardStep } from "@/types/content";

const wizardSteps: WizardStep[] = [
  { id: 1, title: 'Fonte', description: 'Escolha a origem', isCompleted: false, isCurrent: true },
  { id: 2, title: 'Configuração', description: 'Defina parâmetros', isCompleted: false, isCurrent: false },
  { id: 3, title: 'Geração', description: 'IA trabalhando', isCompleted: false, isCurrent: false },
  { id: 4, title: 'Revisão', description: 'Ajuste e publique', isCompleted: false, isCurrent: false },
];

const mockGeneratedContent = {
  title: 'Como Dominar SEO em 2024: Guia Completo para Iniciantes',
  slug: 'como-dominar-seo-2024-guia-completo',
  metaDescription: 'Aprenda as técnicas essenciais de SEO para posicionar seu site no topo do Google. Guia atualizado com as melhores práticas de 2024.',
  body: `
    <h2>O que é SEO e por que é importante?</h2>
    <p>SEO (Search Engine Optimization) é o conjunto de técnicas e estratégias para melhorar o posicionamento de um site nos resultados orgânicos dos mecanismos de busca, como o Google.</p>
    
    <h3>Benefícios do SEO</h3>
    <ul>
      <li>Aumento do tráfego orgânico</li>
      <li>Maior credibilidade e autoridade</li>
      <li>Melhor experiência do usuário</li>
      <li>ROI sustentável a longo prazo</li>
    </ul>
    
    <h2>Pilares Fundamentais do SEO</h2>
    <p>Para uma estratégia de SEO eficaz, é essencial trabalhar três pilares principais: técnico, conteúdo e autoridade.</p>
    
    <h3>SEO Técnico</h3>
    <p>Envolve a otimização da estrutura do site, velocidade de carregamento, mobile-first indexing e arquitetura de informação.</p>
    
    <h3>SEO de Conteúdo</h3>
    <p>Foca na criação de conteúdo relevante, otimizado para palavras-chave e que atenda à intenção de busca do usuário.</p>
    
    <h2>FAQ - Perguntas Frequentes</h2>
    <h4>Quanto tempo leva para ver resultados de SEO?</h4>
    <p>Geralmente, os primeiros resultados aparecem entre 3 a 6 meses, dependendo da competitividade do nicho.</p>
    
    <h4>SEO é melhor que tráfego pago?</h4>
    <p>Ambos têm seus méritos. SEO oferece resultados sustentáveis, enquanto tráfego pago traz resultados imediatos.</p>
  `,
};

interface CreateContentProps {
  onNavigate: (page: string) => void;
}

export function CreateContent({ onNavigate }: CreateContentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSource, setSelectedSource] = useState<ContentSource | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [config, setConfig] = useState({
    sourceInput: '',
    keyword: '',
    toneOfVoice: 'professional' as ToneOfVoice,
    persona: '',
    niche: '',
    language: 'pt-BR',
    generateFAQ: true,
  });

  const handleConfigChange = (field: string, value: string | boolean) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setIsGenerating(true);
      setCurrentStep(2);
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

  const canProceed = () => {
    if (currentStep === 0) return selectedSource !== null;
    if (currentStep === 1) return config.sourceInput.trim() !== '';
    return true;
  };

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
            <SourceSelector selected={selectedSource} onSelect={setSelectedSource} />
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
            <GeneratingState onComplete={handleGenerationComplete} />
          </div>
        );
      
      case 3:
        return (
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
              content={mockGeneratedContent}
              seoScore={{
                overall: 87,
                readability: 85,
                keywordDensity: 90,
                structure: 88,
                meta: 92,
              }}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate('dashboard')}>
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

      {/* Progress */}
      <WizardProgress steps={wizardSteps} currentStep={currentStep} />

      {/* Content */}
      <div className="rounded-xl border border-border bg-card p-6 lg:p-8">
        {renderStepContent()}
      </div>

      {/* Navigation */}
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
              <Button variant="outline">
                Salvar Rascunho
              </Button>
              <Button variant="gradient">
                Publicar Artigo
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
