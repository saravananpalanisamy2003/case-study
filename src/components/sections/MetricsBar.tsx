import { metrics } from '../../data/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function MetricsBar() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`relative z-10 -mt-6 border-y border-[#F0E0D6] bg-white shadow-lg shadow-[#1A1008]/5 transition-all duration-700 sm:-mt-8 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#F0E0D6] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {metrics.map(({ value, label }, index) => (
          <div
            key={value}
            className="group px-5 py-7 transition hover:bg-[#FFF4ED] sm:px-7"
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <p className="font-display text-3xl font-extrabold tracking-tight text-[#FF6600] transition group-hover:scale-105 sm:text-4xl">
              {value}
            </p>
            <p className="mt-2 text-xs leading-5 text-[#6B5E58] sm:text-sm">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
