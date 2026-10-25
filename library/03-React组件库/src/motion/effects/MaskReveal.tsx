import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapScope } from '../useGsap';
import { useReducedMotion } from '../useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  /** 一行一个节点；换行由外部控制，组件只负责"掀" */
  lines: ReactNode[];
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  /** 'load' 用于首屏（立即播），'scroll' 用于后面的段落 */
  trigger?: 'load' | 'scroll';
  delay?: number;
  stagger?: number;
  duration?: number;
};

/**
 * 遮罩掀字（mask reveal）
 *
 * 逆自 lando 的首屏标题：每行一个 overflow:hidden 的容器，
 * 内层 span 从 yPercent:115 掀到 0，ease 用 expo.out，行间错开 0.1s。
 *
 * 为什么必须 overflow:hidden + 内层位移，而不是直接 fade：
 * 直接 fade 是"出现"，遮罩上移是"被生产出来"——后者才有印刷感。
 * 这也是三家站点最共同的一个动作。
 */
export function MaskReveal({
  lines,
  as = 'h2',
  className = '',
  trigger = 'scroll',
  delay = 0,
  stagger = 0.1,
  duration = 1.15,
}: Props) {
  const reduced = useReducedMotion();

  const ref = useGsapScope<HTMLElement>(
    (el) => {
      const inners = el.querySelectorAll<HTMLElement>('.mr-inner');
      if (!inners.length) return;

      if (reduced) {
        gsap.set(inners, { yPercent: 0 });
        return;
      }

      gsap.set(inners, { yPercent: 115 });
      gsap.to(inners, {
        yPercent: 0,
        duration,
        stagger,
        delay,
        ease: 'expo.out',
        scrollTrigger:
          trigger === 'scroll'
            ? { trigger: el, start: 'top 88%', once: true }
            : undefined,
      });
    },
    [reduced, trigger, delay, stagger, duration]
  );

  const Tag = as as 'h2';

  return (
    <Tag ref={ref as never} className={`mr ${className}`}>
      {lines.map((line, i) => (
        <span className="mr-mask" key={i}>
          <span className="mr-inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
