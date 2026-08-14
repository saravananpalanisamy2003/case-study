import { Users, TrendingUp, Clock, Trophy, Activity } from 'lucide-react';
import { metrics } from '../../data/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionHeader } from '../ui/SectionHeader';
const METRIC_ICONS = [Users, TrendingUp, Clock, Trophy];

export function MetricsBar() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`relative z-10 border-y border-[#F0E0D6] bg-white py-12 shadow-lg shadow-[#1A1008]/5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader icon={Activity} title1="By The" title2="Numbers" />
        <div className="grid grid-cols-1 divide-y divide-[#F0E0D6] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 rounded-2xl overflow-hidden border border-[#F0E0D6]">
        {metrics.map(({ value, label }, index) => {
          const Icon = METRIC_ICONS[index % METRIC_ICONS.length];
          return (
            <div
              key={value}
              className="group px-5 py-7 transition card-interactive hover:bg-[#FFF4ED] sm:px-7"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-2 text-[#FF6600]">
                <Icon size={24} className="opacity-80 transition-transform group-hover:scale-110" />
                <p className="font-display text-3xl font-extrabold tracking-tight transition group-hover:scale-105 sm:text-4xl">
                  {value}
                </p>
              </div>
              <p className="text-xs leading-5 text-[#6B5E58] sm:text-sm">{label}</p>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
