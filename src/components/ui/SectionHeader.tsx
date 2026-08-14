import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  title1: string;
  title2: string;
  dark?: boolean;
}

export function SectionHeader({ icon: Icon, title1, title2, dark = false }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-row items-center justify-center text-center gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#FFF4ED] text-[#FF6600]">
        <Icon size={28} />
      </div>
      <h2 className="font-display text-3xl font-extrabold sm:text-4xl text-left">
        <span className={dark ? "text-white" : "text-[#1A1008]"}>{title1}</span>{' '}
        <span className="text-[#FF6600]">{title2}</span>
      </h2>
    </div>
  );
}
