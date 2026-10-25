import { useEffect, useState } from 'react';

/**
 * 系统是否要求减少动效。
 * 所有效果组件都必须先问它 —— 这是 lando 那类站点的底线：
 * 关掉动效时页面必须是「静态但完整」的，而不是塌成一片空白。
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return reduced;
}
