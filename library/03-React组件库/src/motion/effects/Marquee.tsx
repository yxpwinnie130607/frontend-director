import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapScope } from '../useGsap';
import { useReducedMotion } from '../useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * 跑马灯（marquee）—— **不自动播放**
 *
 * 逆自 lando：这一条最反直觉。你以为它在循环，实际代码是
 *   fromTo(x: '9vw' → '-9vw') + scrub: 0
 * 位置完全由滚动进度决定：页面停它就停，往回滚它倒着走。
 *
 * 为什么不用 CSS animation：
 *   自动播放的跑马灯在"演给你看"，滚动驱动的跑马灯在"回应你的手"。
 *   前者再顺也廉价，后者哪怕慢一点也高级。
 */
export function Marquee({
  items,
  speedVW = 9,
  className = '',
}: {
  items: string[];
  speedVW?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  const ref = useGsapScope<HTMLDivElement>(
    (el) => {
      const track = el.querySelector<HTMLElement>('.mq-track');
      if (!track || reduced) return;

      gsap.fromTo(
        track,
        { x: `${speedVW}vw` },
        {
          x: `-${speedVW}vw`,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0,
          },
        }
      );
    },
    [reduced, speedVW]
  );

  // 内容复制两份，滚到尽头也不会露出空白
  const row = items.map((s, i) => (
    <span className="mq-item" key={i}>
      {s}
      <i aria-hidden>✦</i>
    </span>
  ));

  return (
    <div ref={ref} className={`mq ${className}`} aria-hidden>
      <div className="mq-track">
        <div className="mq-row">{row}</div>
        <div className="mq-row">{row}</div>
      </div>
    </div>
  );
}
