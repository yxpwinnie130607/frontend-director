import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * 把一段 GSAP 逻辑绑定到一个元素的作用域里，并在卸载时自动 revert。
 *
 * 为什么用 gsap.context：
 *   1) 选择器自动限定在 ref 内，不会误伤别的组件
 *   2) ctx.revert() 会一并还原 inline style 与创建的 ScrollTrigger
 *   3) React 18 的 StrictMode 会挂载两次，没有 revert 就会叠出两套动画
 */
export function useGsapScope<T extends HTMLElement = HTMLDivElement>(
  setup: (el: T) => void,
  deps: unknown[] = []
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => setup(el), el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/** 把数值夹到区间内（每帧调用，避免引入额外依赖） */
export const clamp = (min: number, max: number, v: number) =>
  v < min ? min : v > max ? max : v;
