import { cn } from "@/lib/utils";

interface SEOScoreRingProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function SEOScoreRing({ score, size = 'md', showLabel = true }: SEOScoreRingProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return { stroke: '#22c55e', bg: 'bg-green-400/10', text: 'text-green-400' };
    if (score >= 70) return { stroke: '#10b981', bg: 'bg-emerald-400/10', text: 'text-emerald-400' };
    if (score >= 50) return { stroke: '#eab308', bg: 'bg-yellow-400/10', text: 'text-yellow-400' };
    if (score >= 30) return { stroke: '#f97316', bg: 'bg-orange-400/10', text: 'text-orange-400' };
    return { stroke: '#ef4444', bg: 'bg-red-400/10', text: 'text-red-400' };
  };

  const colors = getScoreColor(score);
  
  const dimensions = {
    sm: { size: 48, stroke: 4, text: 'text-sm' },
    md: { size: 80, stroke: 6, text: 'text-xl' },
    lg: { size: 120, stroke: 8, text: 'text-3xl' },
  };

  const dim = dimensions[size];
  const radius = (dim.size - dim.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: dim.size, height: dim.size }}>
        <svg
          className="rotate-[-90deg]"
          width={dim.size}
          height={dim.size}
        >
          {/* Background circle */}
          <circle
            cx={dim.size / 2}
            cy={dim.size / 2}
            r={radius}
            fill="transparent"
            stroke="hsl(var(--muted))"
            strokeWidth={dim.stroke}
          />
          {/* Progress circle */}
          <circle
            cx={dim.size / 2}
            cy={dim.size / 2}
            r={radius}
            fill="transparent"
            stroke={colors.stroke}
            strokeWidth={dim.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-bold", dim.text, colors.text)}>
            {score}
          </span>
        </div>
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-muted-foreground">SEO Score</span>
      )}
    </div>
  );
}
