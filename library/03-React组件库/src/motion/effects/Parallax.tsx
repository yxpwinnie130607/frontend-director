import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapScope } from '../useGsap';
import { useReducedMotion } from '../useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  /** 正数=往上慢、负数=往上快；0.1 很小，0.3 已经很夸张 */
  speed?: number;
  className?: string;
};

/**
 * 层视差（parallax）
 *
 * 逆自 lando：所有视差都是 scrub:true + ease:'none'，没有一条是自动播放。
 * 位置 = 滚动进度的函数，页面停它就停。
 *
 * 两个细节：
 *   - 用 yPercent 而不是 y：百分比按元素自身高度算，不依赖测量，resize 不会错位
 *   - 触发点写 'top bottom' / 'bottom top'：元素一进视口就开始，出去时正好结束
 */
export function Parallax({ children, speed = 0.12, className = '' }: Props) {
  const reduced = useReducedMotion();

  const ref = useGsapScope<HTMLDivElement>(
    (el) => {
      const inner = el.firstElementChild as HTMLElement | null;
      if (!inner || reduced) return;

      gsap.fromTo(
        inner,
        { yPercent: -speed * 50 },
        {
          yPercent: speed * 50,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    },
    [reduced, speed]
  );

  return (
    <div ref={ref} className={`px ${className}`}>
      {children}
    </div>
  );
}
