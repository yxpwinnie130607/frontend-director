import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapScope, clamp } from '../useGsap';
import { useReducedMotion } from '../useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * 速度倾斜（velocity skew）
 *
 * 逆自 lando：滚动越快，内容越"被拖歪"一点，停下就回正。
 * 这不是装饰，是给画面加**重量**——人在快速滚动时会预期"东西被甩一下"。
 *
 * 三个要点：
 *   - 用 getVelocity() 拿瞬时速度（px/s），除以 900 左右得到 0–6deg
 *   - 必须 clamp，否则惯性甩一下会歪到 20 度，像坏了
 *   - 用 quickTo 而不是 onUpdate 里 gsap.to（后者每帧新建补间，必掉帧）
 */
export function VelocitySkew({
  children,
  max = 7,
  divisor = 900,
  className = '',
}: {
  children: ReactNode;
  max?: number;
  divisor?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  const ref = useGsapScope<HTMLDivElement>(
    (el) => {
      if (reduced) return;
      const skewTo = gsap.quickTo(el, 'skewY', { duration: 0.5, ease: 'power3' });
      const scaleTo = gsap.quickTo(el, 'scaleY', { duration: 0.5, ease: 'power3' });

      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = self.getVelocity();
          const s = clamp(-max, max, v / -divisor);
          skewTo(s);
          // 轻微纵向拉伸，强化"被甩"的感觉；0.004 已经很够
          scaleTo(1 + Math.abs(s) * 0.004);
        },
      });
    },
    [reduced, max, divisor]
  );

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
