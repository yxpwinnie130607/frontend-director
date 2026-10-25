import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * 唯一的一个平滑滚动实例。
 *
 * 逆自 lando（lando.itsoffbrand.io）的 bundle，实测值：
 *   lerp: 0.1 / smoothWheel: true / touchMultiplier: 1.25
 *   syncTouch: true / wrapper: documentElement / content: body
 *
 * 关键不是参数，是三件事：
 *   1) lenis.on('scroll', ScrollTrigger.update)  —— 让 ScrollTrigger 用 Lenis 的滚动值
 *   2) gsap.ticker.add(t => lenis.raf(t*1000), false, true)
 *      第三个参数 prioritize=true：Lenis 先更新 scrollY，ScrollTrigger 后读
 *      顺序反了就会"动画慢半拍"
 *   3) gsap.ticker.lagSmoothing(0) —— 关掉卡顿补偿，否则卡一下会跳一段
 *
 * 页面上不允许出现第二个 requestAnimationFrame。所有滚动相关效果
 * 都挂在 gsap.ticker / ScrollTrigger 上。
 */

type LenisApi = {
  lenis: Lenis | null;
  /** 打开浮层 / 弹窗时锁滚动（内部同时停 ScrollTrigger 的刷新） */
  lock: () => void;
  unlock: () => void;
  scrollTo: (target: string | number | HTMLElement, opts?: { offset?: number; immediate?: boolean }) => void;
};

const LenisContext = createContext<LenisApi>({
  lenis: null,
  lock: () => {},
  unlock: () => {},
  scrollTo: () => {},
});

export function useLenis(): LenisApi {
  return useContext(LenisContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();
  const [api, setApi] = useState<LenisApi>({
    lenis: null,
    lock: () => {},
    unlock: () => {},
    scrollTo: () => {},
  });

  useEffect(() => {
    // 减少动效：不接管滚动，交给浏览器原生（省性能，也避免"惯性"冒犯用户）
    if (reduced) {
      document.documentElement.classList.add('no-smooth');
      return () => document.documentElement.classList.remove('no-smooth');
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.25,
      syncTouch: true,
      autoResize: true,
      wrapper: document.documentElement,
      content: document.body,
    });
    lenisRef.current = lenis;

    /* 1) ScrollTrigger 读 Lenis 的值 */
    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    /* 2) 单时钟：Lenis 挂在 gsap.ticker 上，且优先执行 */
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf, false, true);

    /* 3) 关掉 lag smoothing */
    gsap.ticker.lagSmoothing(0);

    /* 字体/图片加载完后必须 refresh，否则触发点算错（最常见的一类 bug） */
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    const t = window.setTimeout(refresh, 600);

    setApi({
      lenis,
      lock: () => lenis.stop(),
      unlock: () => lenis.start(),
      scrollTo: (target, opts) =>
        lenis.scrollTo(target as never, { offset: opts?.offset ?? 0, immediate: opts?.immediate ?? false }),
    });

    return () => {
      window.clearTimeout(t);
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  return <LenisContext.Provider value={api}>{children}</LenisContext.Provider>;
}
