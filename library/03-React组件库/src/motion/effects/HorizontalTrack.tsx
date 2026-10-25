import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapScope } from '../useGsap';
import { useReducedMotion } from '../useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const TrackContext = createContext<{ main: gsap.core.Tween | null }>({ main: null });

/**
 * 横向轨道（horizontal scroll section）
 *
 * 逆自 lando 的横向叙事段。整份 bundle 里 `pin:` 出现 **0 次** ——
 * 它用的是「原生 sticky + 外层撑高 + 函数值 + scrub」，不是 ScrollTrigger 的 pin。
 *
 * 为什么这样更好：
 *   - pin 会插入 spacer 撑开布局，resize 时经常错位；sticky 是浏览器原生布局
 *   - x 写成函数 `() => -dist()` 并配 invalidateOnRefresh，尺寸变了自动重算
 *   - scrub: 1（不是 true）：主位移带一点"重量"，装饰性视差才用 true
 *
 * 数学：外层高度 = 视口高 + 需要横移的距离，这样滚完正好走完轨道。
 */
export function HorizontalTrack({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const [main, setMain] = useState<gsap.core.Tween | null>(null);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;

    const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth);
    const layout = () => {
      sec.style.height = `${window.innerHeight + distance()}px`;
    };

    layout();

    if (reduced) {
      tr.style.overflowX = 'auto';
      return () => {
        sec.style.height = '';
        tr.style.overflowX = '';
      };
    }

    const tween = gsap.to(tr, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: sec,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
        onRefreshInit: layout,
      },
    });
    setMain(tween);

    const ro = new ResizeObserver(() => {
      layout();
      ScrollTrigger.refresh();
    });
    ro.observe(tr);

    return () => {
      ro.disconnect();
      tween.scrollTrigger?.kill();
      tween.kill();
      sec.style.height = '';
      setMain(null);
    };
  }, [reduced]);

  return (
    <section ref={section as never} className={`ht ${className}`}>
      <div className="ht-sticky">
        <div ref={track} className="ht-track">
          <TrackContext.Provider value={{ main }}>{children}</TrackContext.Provider>
        </div>
      </div>
    </section>
  );
}

/**
 * 轨道内的单个面板：二级视差
 *
 * 关键就是 containerAnimation —— 让这个 ScrollTrigger 跟着"横向位移"走，
 * 于是 start/end 用 left/right 而不是 top/bottom。
 */
export function HorizontalItem({
  children,
  depth = 10,
  className = '',
}: {
  children: ReactNode;
  depth?: number;
  className?: string;
}) {
  const { main } = useContext(TrackContext);
  const reduced = useReducedMotion();

  const inner = useGsapScope<HTMLDivElement>(
    (el) => {
      if (!main || reduced) return;
      gsap.to(el, {
        xPercent: -depth,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          containerAnimation: main,
          start: 'left right',
          end: 'right left',
          scrub: true,
        },
      });
    },
    [main, reduced, depth]
  );

  return (
    <div className={`ht-item ${className}`}>
      <div ref={inner} className="ht-item-inner">
        {children}
      </div>
    </div>
  );
}
