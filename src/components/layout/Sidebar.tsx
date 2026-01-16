import { 
  LayoutDashboard, 
  PenTool, 
  History, 
  Settings, 
  Sparkles,
  FileText,
  TrendingUp,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'create', icon: PenTool, label: 'Criar Conteúdo' },
  { id: 'history', icon: History, label: 'Histórico' },
  { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
];

const bottomItems = [
  { id: 'settings', icon: Settings, label: 'Configurações' },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Content<span className="text-primary">AI</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                currentPage === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="mx-4 mb-4 rounded-xl bg-secondary/50 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Zap className="h-4 w-4 text-primary" />
            Créditos
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">847</span>
            <span className="text-xs text-muted-foreground">/ 1000</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[84.7%] rounded-full bg-primary" />
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="border-t border-border p-4">
          {bottomItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                currentPage === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
