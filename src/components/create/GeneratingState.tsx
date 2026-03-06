import { Sparkles, FileText, Search, PenTool, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const steps = [
  { id: 1, icon: Search, label: "Analisando fonte de conteúdo..." },
  { id: 2, icon: FileText, label: "Extraindo informações semânticas..." },
  { id: 3, icon: PenTool, label: "Gerando conteúdo otimizado..." },
  { id: 4, icon: Sparkles, label: "Aplicando técnicas de SEO..." },
  { id: 5, icon: CheckCircle, label: "Finalizando artigo..." },
];

interface GeneratingStateProps {
  onComplete: () => void;
  /** Quando true, chama onComplete (usado quando a API já retornou o conteúdo) */
  isComplete?: boolean;
  /** Mensagem de erro; quando definida, exibe estado de erro e botão para voltar */
  error?: string | null;
  onBack?: () => void;
}

export function GeneratingState({
  onComplete,
  isComplete = false,
  error = null,
  onBack,
}: GeneratingStateProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isComplete) {
      setTimeout(onComplete, 300);
      return;
    }
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [onComplete, isComplete]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="rounded-full bg-destructive/10 p-4 mb-6">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h2 className="font-display text-xl font-bold text-foreground mb-2">
          Erro na geração
        </h2>
        <p className="text-muted-foreground text-center max-w-md mb-6">{error}</p>
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            Voltar à configuração
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-12 w-12 text-primary animate-pulse" />
        </div>
      </div>

      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Gerando seu conteúdo
      </h2>
      <p className="text-muted-foreground mb-8">
        A IA está trabalhando para criar um artigo incrível
      </p>

      <div className="w-full max-w-md space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleteStep = index < currentStep;

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300",
                isActive && "bg-primary/10 border border-primary/30",
                isCompleteStep && "opacity-60",
                !isActive && !isCompleteStep && "opacity-30"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  isCompleteStep ? "bg-green-400/20" : isActive ? "bg-primary/20" : "bg-muted"
                )}
              >
                {isCompleteStep ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-primary animate-pulse" : "text-muted-foreground"
                    )}
                  />
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 w-full max-w-md">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {Math.round(((currentStep + 1) / steps.length) * 100)}% concluído
        </p>
      </div>
    </div>
  );
}
