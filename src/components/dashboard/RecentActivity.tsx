import { FileText, CheckCircle, Upload, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: 'created' | 'reviewed' | 'published' | 'edited';
  title: string;
  time: string;
}

const activities: Activity[] = [
  { id: '1', type: 'published', title: 'Como Otimizar SEO em 2024', time: 'Há 2 horas' },
  { id: '2', type: 'reviewed', title: 'Guia Completo de Marketing Digital', time: 'Há 4 horas' },
  { id: '3', type: 'created', title: 'Tendências de IA para Negócios', time: 'Há 6 horas' },
  { id: '4', type: 'edited', title: 'Estratégias de Content Marketing', time: 'Há 1 dia' },
];

const activityConfig = {
  created: { icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  reviewed: { icon: CheckCircle, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  published: { icon: Upload, color: 'text-green-400', bg: 'bg-green-400/10' },
  edited: { icon: Edit, color: 'text-purple-400', bg: 'bg-purple-400/10' },
};

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        Atividade Recente
      </h3>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;
          
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={cn("rounded-lg p-2", config.bg)}>
                <Icon className={cn("h-4 w-4", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
