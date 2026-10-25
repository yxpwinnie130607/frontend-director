import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapScope } from '../useGsap';
import { useReducedMotion } from '../useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * 卡片批量入场（batch stagger）
 *
 * 逆自 lando 的卡片区：用 ScrollTrigger.batch 而不是给每张卡建一个触发器。
 * 差别在于：batch 会把**同一屏进入**的元素合并成一批，共享一次 stagger，
 * 节奏自然；逐个建触发器会让相邻的卡"各走各的"，看起来散。
 */
export function StaggerGrid({
  children,
  itemSelector = '[data-grid-item]',
  className = '',
  stagger = 0.08,
  y = 40,
}: {
  children: ReactNode;
  itemSelector?: string;
  className?: string;
  stagger?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();

  const ref = useGsapScope<HTMLDivElement>(
    (el) => {
      const items = el.querySelectorAll<HTMLElement>(itemSelector);
      if (!items.length) return;

      if (reduced) {
        gsap.set(items, { clearProps: 'all' });
        return;
      }

      gsap.set(items, { opacity: 0, y });
      ScrollTrigger.batch(items, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger, ease: 'power3.out' }),
      });
    },
    [reduced, itemSelector, stagger, y]
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
