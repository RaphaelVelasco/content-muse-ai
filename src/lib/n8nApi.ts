import type {
  N8nTriggerPayload,
  N8nTriggerResponse,
  GeneratedContentData,
  ContentItem,
} from "@/types/content";

const getWebhookUrl = (): string => {
  return import.meta.env.VITE_N8N_WEBHOOK_URL ?? "";
};

/** URL base do n8n para montar link da execução (opcional). */
export function getN8nExecutionUrl(executionId: string): string | null {
  const base = import.meta.env.VITE_N8N_BASE_URL as string | undefined;
  if (!base?.trim() || !executionId) return null;
  return `${base.replace(/\/$/, "")}/executions/${executionId}`;
}

/**
 * Dispara a geração de conteúdo no n8n.
 * Se VITE_N8N_WEBHOOK_URL não estiver definida, retorna sucesso com conteúdo mock (modo demo).
 */
export async function triggerGeneration(
  payload: N8nTriggerPayload
): Promise<N8nTriggerResponse> {
  const url = getWebhookUrl();
  if (!url.trim()) {
    return getMockGenerationResponse(payload);
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      return {
        success: false,
        error: text || `Erro HTTP ${res.status}`,
      };
    }
    const data = (await res.json()) as N8nTriggerResponse;
    return data;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro ao chamar n8n";
    return { success: false, error: message };
  }
}

/**
 * Publica ou salva como rascunho no WordPress (via n8n ou backend).
 * Payload pode incluir executionId e status.
 */
export async function publishOrSaveDraft(
  content: GeneratedContentData,
  status: "draft" | "publish"
): Promise<{ success: boolean; error?: string; link?: string }> {
  const url = getWebhookUrl();
  if (!url.trim()) {
    return {
      success: true,
      link: undefined,
    };
  }
  try {
    const publishUrl = `${url.replace(/\/?$/, "")}/publish`;
    const res = await fetch(publishUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, status }),
    });
    if (!res.ok) {
      const text = await res.text();
      return { success: false, error: text || `Erro HTTP ${res.status}` };
    }
    const data = (await res.json()) as { success: boolean; link?: string; error?: string };
    return { success: data.success, error: data.error, link: data.link };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro ao publicar";
    return { success: false, error: message };
  }
}

/**
 * Lista histórico de conteúdos (execuções).
 * Se não houver endpoint, retorna array vazio para usar mock no front.
 */
export async function getHistory(): Promise<ContentItem[]> {
  const url = getWebhookUrl();
  if (!url.trim()) {
    return [];
  }
  try {
    const listUrl = `${url.replace(/\/?$/, "")}/history`;
    const res = await fetch(listUrl);
    if (!res.ok) return [];
    const data = (await res.json()) as ContentItem[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function getMockGenerationResponse(
  payload: N8nTriggerPayload
): N8nTriggerResponse {
  const title =
    payload.keyword || payload.sourceInput
      ? `Artigo sobre ${payload.keyword || payload.sourceInput}`
      : "Como Dominar SEO em 2024: Guia Completo para Iniciantes";
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 80);
  const content: GeneratedContentData = {
    title,
    slug,
    metaDescription: `Aprenda mais sobre ${payload.keyword || "o tema"} neste guia atualizado.`,
    body: `
    <h2>Introdução</h2>
    <p>Este é um conteúdo gerado automaticamente. Configure a variável <code>VITE_N8N_WEBHOOK_URL</code> no arquivo <code>.env</code> para conectar ao fluxo n8n e gerar artigos reais.</p>
    <h2>Conteúdo principal</h2>
    <p>O fluxo n8n processará sua fonte (RSS, YouTube ou palavra-chave) e retornará o artigo completo com SEO, imagens e FAQ quando configurado.</p>
    <h2>FAQ</h2>
    <h4>Como conectar ao n8n?</h4>
    <p>Defina a URL do webhook do seu workflow no arquivo .env como VITE_N8N_WEBHOOK_URL.</p>
  `,
    keyword: payload.keyword,
    seoScore: {
      overall: 75,
      readability: 80,
      keywordDensity: 70,
      structure: 78,
      meta: 72,
    },
  };
  return {
    success: true,
    content,
    executionId: `mock-${Date.now()}`,
  };
}
