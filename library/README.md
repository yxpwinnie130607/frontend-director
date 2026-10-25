# MOTION-LIBRARY · 动效与审美资料库

**28 个顶级交互网站的真实逆向，加上可跑的成品、可装的规范、可查的数据。**

一句话说清它能干什么：**让 AI 做出的网页不再有"模板味"。**

---

## 里面有什么（7 个分区）

| 目录 | 内容 | 什么时候用 | 体积 |
|---|---|---|---|
| **01-规范** | SKILL.md（施工规范）+ 9 份文档 + 单文件合并版 | 要让 AI 按流程做 | 0.2 MB |
| **02-可运行基线** | 三套成品（编辑型 / 3D 型 / 产品型），双击就开 | 要看"目标长什么样" | 0.06 MB |
| **03-React组件库** | 12 个组件 + 完整工程（Vite）+ 2 份逆向说明 | 项目是 React/Next | 0.07 MB |
| **04-逆向数据** | 6 个 JSON（技术栈/字号/渲染/时长/3D）+ 25 站真实配置 | 要查具体数字或别人的写法 | 0.92 MB |
| **05-视觉参照** | 22 个站 × 2 帧截图（首屏 + 中段） | 要对比构图 | 16.6 MB |
| **06-工具脚本** | 验收 + 抓取 + 分析，全套可复现 | 要重跑或验收自己的页面 | 0.06 MB |
| **07-原始HTML** | 28 个站的 HTML 原文 | 要看结构和内联样式 | 8.0 MB |

合计 **154 个文件 / 26 MB**。

---

## 从哪开始（按你的时间选）

**30 秒** → 双击 `02-可运行基线/editorial/index.html`。这就是目标。

**10 分钟** → 读 `01-规范/START-HERE.md`，里面有一节"为什么你的 skill 没用"。

**1 小时** → 读 `01-规范/docs/00-diagnosis.md`（六个病因）+ `docs/02-aesthetic-fingerprint.md`（实测数值）。

**要动手** → 把整个文件夹给 AI，让它读 `01-规范/SKILL.md`。

---

## 三种使用场景

### A · 让 AI 做网站

```
1. 把文件夹给它（或只给 01-规范 + 02-可运行基线）
2. 让它读 SKILL.md，按五步流程走
3. 交付后跑：node 06-工具脚本/verify.mjs <产物>
4. 11 项全过才算完成
```

关键约束（贴给它）：

> 不许从零写，必须复制 `02-可运行基线/editorial/index.html` 作为起点。
> 不许用形容词描述方案，所有视觉决定必须给具体数值。
> 交付前必须跑 verify.mjs，不过就改。

### B · 让 AI 写/改一个 skill

给它 01-规范 + 04-逆向数据。然后用这个闭环验证它写得好不好：

```
让它用新 skill 做三个不同主题的页面
→ 每个跑 verify.mjs
→ 跟 baseline 并排截图
→ 三次都过、且版式不能雷同
```

**改 skill，不要改产物**——否则它会手工修出一个好看的页面来糊弄验收。

### C · 自己查

```
想知道某站用了什么技术      → 04-逆向数据/tech.json
想查字号/字距/色彩的真实值  → 04-逆向数据/type.json
想看别人的 GSAP 怎么写      → 04-逆向数据/snippets/<站名>.txt
想查时长/错开的分布        → 04-逆向数据/timing.json
想查 3D 参数（fov/DPR/bloom）→ 04-逆向数据/webgl.json
```

---

## 各分区细目

### 01-规范
```
SKILL.md              施工规范：五步流程 + 10 条硬指标 + 30 条禁令
START-HERE.md         作业说明（含可直接粘贴的开场指令）
ALL-IN-ONE.md         上面两个 + 8 份文档 + 代码，合并成一个文件（给网页版 AI）
ARCHIVE-README.md     原始项目的总说明（方法、边界）
docs/
  00-diagnosis.md         六个病因（为什么普通写法出不来效果）
  01-taxonomy.md          三套制度 + 判定树
  02-aesthetic-fingerprint.md  ★ 28 站实测数值 + 可粘贴 CSS
  03-motion-recipes.md    6 个动效配方（含真实片段）
  04-webgl-recipes.md     3D 材质/光照/相机/shader
  05-anti-patterns.md     ★ 30 条 AI 味清单
  06-build-playbook.md    从需求到成品的 SOP
  07-verification.md      12 项判据 + 逐项改法
  08-samples.md           26 个站总表
```

### 02-可运行基线
三套都是**单文件、零构建、CDN 引库**，双击就能看，且全部 11/11 通过验收。

| 目录 | 制度 | 代表站 | 关键手法 |
|---|---|---|---|
| `editorial/` | 编辑叙事 | lando / basement / darkroom | 贴边大字、1px 分隔线、非对称列、sticky 横向 |
| `immersive/` | 3D 沉浸 | bruno / lusion / igloo | three.js、程序化光箱、滚动驱动相机 |
| `product/` | 产品精细 | vercel / linear / superlist | **不用 GSAP**，纯 CSS + IntersectionObserver |

### 03-React组件库
```
src/motion/
  SmoothScroll.tsx        单时钟底座（Lenis 挂 gsap.ticker）
  useGsap.ts              gsap.context 清理
  useReducedMotion.ts     降级判断
  effects/
    MaskReveal.tsx        遮罩掀字
    Parallax.tsx          视差
    HorizontalTrack.tsx   sticky 横向（含 HorizontalItem）
    Marquee.tsx           滚动驱动跑马灯
    Magnetic.tsx          指针磁性
    VelocitySkew.tsx      速度倾斜
    StaggerGrid.tsx       批量进入
    PinScene.tsx          固定场景多幕
preview.html              免安装预览
package.json / vite.config.ts   可直接 npm i && npm run dev
```

### 04-逆向数据
```
tech.json      每站技术栈（bundle 内真实计数：gsap/lenis/three/ogl…）
type.json      字号序列、字族、色彩、圆角、阴影（浏览器实测）
render.json    页高、canvas、滚动驱动元素数、5 个位置的元素快照
timing.json    duration / stagger / font-weight 分布
webgl.json     fov / roughness / metalness / bloom / DPR
matrix.json    综合矩阵
snippets/      25 个站的真实配置原文（min 化后抽出）
```

### 05-视觉参照
命名规则 `<站名>-00.png`（首屏）/ `<站名>-45.png`（约 45% 滚动位置）。
共 22 个站。看构图用，不是用来抄的。

### 06-工具脚本
```
verify.mjs             ★ 12 项验收（最常用）
verify-react.mjs       React 版验收
shoot.mjs              批量截图
fetch_static.py        抓站 + 技术栈指纹
render.mjs             渲染 + 滚动差分
probe_type.mjs         排版探针
extract_snippets.py    抽真实配置
distributions.py       时长/错开/字重分布
summarise.py           汇总
pack.sh                打包精简子集
```

### 07-原始HTML
28 个站的首屏 HTML 原文。可以看内联的 critical CSS、font preload、script 顺序。

---

## 数据可信度

```
抓取时间   2026-10-25
方法        curl 抓 HTML → 提取 js/css → 下载 bundle → 正则统计
            → 无头 Chrome 渲染 → getComputedStyle 实测
            → 滚 5 个位置做差分 → 反推滚动驱动元素
```

**四条最反直觉的实测结论：**

| 结论 | 证据 |
|---|---|
| GSAP 数量不等于审美 | vercel / linear / superlist 的 `ease:` 是 **0 次**，水平不低于 lando |
| `pin: true` 已过时 | 26 站合计 **0 次**，横向全用 `position: sticky` |
| 标题不用粗 | 279 处声明：500 占 34%、400 占 31%、**700 只占 9%** |
| stagger 是 15–30ms | 0.02s×33、0.015s×20（80ms 只出现 5 次） |

---

## 边界（必须知道）

| 期望 | 现实 |
|---|---|
| 装了就自动有审美 | ❌ 它只会**不犯那 30 个错**，不会发明视觉语言 |
| 什么内容都能做出 lando | ❌ lando 的观感 60% 来自内容（专业摄影、人物叙事、21 个媒体元素） |
| 照抄数值就行 | ❌ 数值只在正确结构里成立，先有结构 |
| 一次生成就完美 | ❌ 需要"改一处 → 跑验收 → 截图对比"的循环 |

**没有这四样，先别谈 lando 的效果：**
```
□ 6–10 张能高低错落的图
□ 一句能被记住的话
□ 一个具体数字（不是"10x 提效"，是"42 篇样本"）
□ 一个真的能用鼠标点的交互
```

---

## 两个来源

这个文件夹合并了两个项目：

- **web-motion-archive** — 28 站逆向 + 3 套 HTML 基线 + 数据（→ 01/02/04/05/06/07）
- **gsap-react-lab** — React 组件库 + 逆向说明（→ 03）

两者的分工：**前者回答"做成什么样"，后者回答"在 React 里怎么写"。**

---

*154 个文件，26 MB。所有数值可在 `04-逆向数据/` 里追溯。*
