import { useEffect, useState } from 'react';

const HERO_BREAKPOINT = 520;

export function useScrolledPastHero() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > HERO_BREAKPOINT);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return pastHero;
}
