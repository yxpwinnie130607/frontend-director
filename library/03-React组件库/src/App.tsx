import { useEffect, useRef } from 'react';
import { SmoothScroll, MaskReveal, Parallax, HorizontalTrack, HorizontalItem, Marquee, Magnetic, VelocitySkew, StaggerGrid, PinScene } from './motion';

const PANELS = [
  {
    no: '01 / RETRIEVE',
    title: '先取一个人的写法',
    body: '把他怎么开口、在哪下钩子、什么节奏，拆成可复用的规则。不是模仿语气，是借一套结构。',
  },
  {
    no: '02 / REWRITE',
    title: '再换成你的内容',
    body: '同一条规则，套不同的题材。横移的每一屏都是一次"换皮不换骨"的示范。',
  },
  {
    no: '03 / SHOOT',
    title: '最后拍出来',
    body: '断句、停顿、重音标好，镜头提示也给。屏幕上能读的句子，念出来常常是死的。',
  },
];

const CARDS = [
  { n: '01', t: 'Sticky, not pin', d: '横向用原生 sticky 撑高度，resize 不会错位。' },
  { n: '02', t: 'Function values', d: 'x: () => -dist()，尺寸变了自动重算，不用重建动画。' },
  { n: '03', t: 'One clock', d: 'Lenis 挂在 gsap.ticker 上并优先执行，ScrollTrigger 吃同一个 tick。' },
  { n: '04', t: 'Scrub 分三级', d: '主位移 1（有重量），视差 true，纯函数的 0。' },
  { n: '05', t: 'No autoplay', d: '跑马灯位置 = 滚动进度，页面停它就停。' },
  { n: '06', t: 'Reduced motion', d: '关掉动效时页面必须静态但完整，而不是空白。' },
];

export default function App() {
  const navRef = useRef<HTMLDivElement | null>(null);

  // 导航压到深色横向段时换深色玻璃 —— lando 同款的自适应着色
  useEffect(() => {
    const nav = navRef.current;
    const dark = document.getElementById('horizontal');
    if (!nav || !dark) return;
    const io = new IntersectionObserver(
      ([e]) => nav.classList.toggle('on-dark', e.isIntersecting),
      { rootMargin: '-64px 0px -100% 0px' }
    );
    io.observe(dark);
    return () => io.disconnect();
  }, []);

  return (
    <SmoothScroll>
      <nav className="nav">
        <div className="nav-inner" ref={navRef}>
          <span className="brand">GSAP × Lenis Lab</span>
          <div className="nav-links">
            <a href="#horizontal">横向</a>
            <a href="#scene">钉住</a>
            <a href="#cards">批量</a>
          </div>
          <Magnetic strength={10}>
            <a className="btn" href="#">开始</a>
          </Magnetic>
        </div>
      </nav>

      <header className="hero wrap">
        <MaskReveal
          as="h1"
          trigger="load"
          stagger={0.09}
          lines={[
            'Style is not',
            'a feeling.',
            <em key="e">It's a procedure.</em>,
          ]}
        />
        <p className="lead">
          这一页里每个动作都是从 lando / ojo / offer 的打包产物里反推出来的：
          参数、触发点、scrub 等级，全部按原站的值写。
        </p>
        <div className="hero-meta">
          <span>LENIS LERP 0.1</span>
          <span>SINGLE TICKER</span>
          <span>SCRUB 1 / TRUE / 0</span>
        </div>
      </header>

      {/* 视差：位置 = 滚动进度 */}
      <section className="sec wrap">
        <div className="kicker">01 / parallax</div>
        <MaskReveal
          as="h2"
          lines={['两层不同速度，', '就有纵深。']}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 18, marginTop: 48 }}>
          <Parallax speed={0.16}>
            <div className="px-media">SPEED 0.16</div>
          </Parallax>
          <Parallax speed={-0.1}>
            <div className="px-media" style={{ height: '38vh' }}>SPEED -0.10</div>
          </Parallax>
        </div>
      </section>

      {/* 横向：sticky + 函数值 + scrub 1 */}
      <HorizontalTrack className="ht" >
        {PANELS.map((p, i) => (
          <HorizontalItem key={p.no} depth={i % 2 === 0 ? 10 : -6}>
            <div className="ht-card">
              <div className="ht-no">{p.no}</div>
              <div>
                <h3>{p.title}</h3>
                <p style={{ marginTop: 14 }}>{p.body}</p>
              </div>
            </div>
          </HorizontalItem>
        ))}
      </HorizontalTrack>

      {/* 钉住场景：逐个淡入，不用 pin */}
      <PinScene
        className="sec"
        steps={[
          <div key="a">
            <div className="kicker" style={{ justifyContent: 'center' }}>02 / sticky scene</div>
            <div className="ps-big">一屏<br />只有一件事。</div>
          </div>,
          <div key="b">
            <div className="kicker" style={{ justifyContent: 'center' }}>still here</div>
            <div className="ps-big">滚动<br /><em>替它换气</em>。</div>
          </div>,
          <div key="c">
            <div className="kicker" style={{ justifyContent: 'center' }}>and here</div>
            <div className="ps-big">然后<br />再往下。</div>
          </div>,
        ]}
      />

      {/* 批量入场 */}
      <section className="sec wrap" id="cards">
        <div className="kicker">03 / batch</div>
        <MaskReveal as="h2" lines={['同一屏进来的，', '才算一批。']} />
        <StaggerGrid className="cards" stagger={0.08}>
          {CARDS.map((c) => (
            <article className="card" data-grid-item key={c.n}>
              <b>{c.n}</b>
              <div>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            </article>
          ))}
        </StaggerGrid>
      </section>

      {/* 速度倾斜 */}
      <section className="sec">
        <VelocitySkew max={7}>
          <div className="wrap">
            <div className="kicker">04 / velocity</div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(38px,7vw,104px)', lineHeight: 0.98, marginTop: 20 }}>
              快速滚动时，<br />内容会被<em>拖歪</em>一点。
            </h2>
          </div>
        </VelocitySkew>
      </section>

      <Marquee items={['Voice', 'Hooks', 'Pacing', 'Structure', 'Cadence']} />

      <footer className="foot wrap">
        <small>
          Reverse-engineered values · lando.itsoffbrand.io / ojo.art / offer.studio<br />
          Lenis 0.1 · ScrollTrigger scrub 1 / true / 0 · single ticker · no autoplay
        </small>
      </footer>
    </SmoothScroll>
  );
}
