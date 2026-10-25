import { useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../useReducedMotion';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

/**
 * 钉住场景（sticky scene，逐幕切换）
 *
 * 逆自 lando 的"一屏文字 → 一屏产品 → 一屏大字"的节奏：
 * 依旧是 sticky + scrub，不用 pin。
 *
 * 结构：
 *   <section style="height: steps*100vh">
 *     <div class="sticky top:0 h:100vh">   ← 视口内固定
 *        step 0 / step 1 / step 2 ...      ← 绝对定位叠在一起
 *
 * 每一幕：上一幕淡出上移，下一幕淡入上移，中间有 0.2 的重叠（接力）。
 */
export function PinScene({
  steps,
  className = '',
  stepHeightVH = 100,
}: {
  steps: ReactNode[];
  className?: string;
  stepHeightVH?: number;
}) {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sec = section.current;
    if (!sec) return;
    const panels = Array.from(sec.querySelectorAll<HTMLElement>('.ps-panel'));
    if (!panels.length) return;

    if (reduced) {
      gsap.set(panels, { opacity: 1, y: 0 });
      panels.forEach((p) => (p.style.position = 'relative'));
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    gsap.set(panels, { opacity: (i: number) => (i === 0 ? 1 : 0), y: (i: number) => (i === 0 ? 0 : 40) });

    // 每一幕停留 1 个单位，只在最后 0.34 里换幕。
    // 停留长、转场短 —— 否则两幕会长时间叠在一起，字压字。
    const TR = 0.34;
    panels.slice(1).forEach((panel, i) => {
      const at = i + 1 - TR;
      tl.to(panels[i], { opacity: 0, y: -26, scale: 0.985, duration: TR * 0.55, ease: 'power2.in' }, at)
        .to(panel, { opacity: 1, y: 0, duration: TR * 0.9, ease: 'power2.out' }, at + TR * 0.35);
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reduced, steps.length]);

  return (
    <section
      ref={section as never}
      className={`ps ${className}`}
      style={{ height: `${Math.max(steps.length, 1) * stepHeightVH}vh` }}
    >
      <div className="ps-sticky">
        {steps.map((node, i) => (
          <div className="ps-panel" key={i}>
            {node}
          </div>
        ))}
      </div>
    </section>
  );
}
