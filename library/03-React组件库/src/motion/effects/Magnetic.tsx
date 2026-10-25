import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../useReducedMotion';

/**
 * 磁性元素（magnetic）
 *
 * 逆自 lando 的按钮与光标：指针靠近时元素被"吸"过去几个像素，
 * 离开后弹回。幅度必须小（8–14px），大了就像在抖。
 *
 * 实现上刻意**不用**自己的 requestAnimationFrame：
 * 用 gsap.quickTo —— 它复用 gsap.ticker，不会和 Lenis 抢帧。
 * （lando 是手写 lerp 挂 ticker；两种都对，quickTo 更省代码。）
 */
export function Magnetic({
  children,
  strength = 12,
  radius = 90,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return; // 触屏不做

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const near = Math.hypot(dx, dy) < radius + Math.max(r.width, r.height) / 2;

      const nx = near ? gsap.utils.clamp(-strength, strength, dx * 0.18) : 0;
      const ny = near ? gsap.utils.clamp(-strength, strength, dy * 0.18) : 0;
      xTo(nx);
      yTo(ny);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      gsap.killTweensOf(el);
    };
  }, [reduced, strength, radius]);

  return (
    <div ref={ref} className={`mg ${className}`} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
