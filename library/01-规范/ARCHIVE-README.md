# web-motion-archive

**28 个顶级交互网站的真实逆向 + 三套可运行基线 + 12 项验收。**

做这件事的原因很具体：你有一个 skill，装上去之后 AI 做不出 Lando 那种水准的页面，**怎么调都没用**。

这份材料回答"为什么没用"以及"怎么才能有用"。

---

## 一、先看结论：六个病因

详细论证在 `docs/00-diagnosis.md`，摘要：

| # | 病因 | 表现 |
|---|---|---|
| 1 | skill 传的是**形容词** | "高级""有质感"不改变模型任何一个采样决定 |
| 2 | 没有**范例在上下文里** | 模型只能凭记忆画 → 画出"平均值" |
| 3 | 没有**强制脚手架** | 从零写必然退回"卡片网格 + 渐变" |
| 4 | 参数离开结构会失效 | lando 的 117 处 scrub 搬到产品页 = 灾难 |
| 5 | 审美其实是**三套互斥制度** | 混在一起就是四不像 |
| 6 | 没有**验收** | "感觉不对"无法定位，只能一直试 |

对应的解法：**基线 + 数值 + 禁令 + 验收**。四样都在这个目录里。

---

## 二、怎么用（三步）

### 1. 直接给 AI 这份

```
SKILL.md                      ← 强制流程，先发这个
docs/                         ← 八份参考（AI 按需读）
baseline/editorial|immersive|product/   ← 三套可运行成品
data/snippets/*.txt           ← 28 站真实 GSAP 配置原文
scripts/verify.mjs            ← 验收脚本
```

已经打包好的精简版在 `dist/handoff-<日期>/`（约 8MB，56 个文件）。

### 2. 让人看的

- `docs/00-diagnosis.md` — 为什么你现在的做法不行
- `docs/08-samples.md` — 26 个站的总表（制度、技术栈、字号比、缓动数）
- `docs/05-anti-patterns.md` — 30 条"AI 味"清单，逐条对照

### 3. 自己跑一遍

```bash
open baseline/editorial/index.html     # 双击也能开
open baseline/immersive/index.html
open baseline/product/index.html

node scripts/verify.mjs baseline/editorial/index.html
```

三套基线全部 **11/11 通过**。

---

## 三、三套基线是什么

| 目录 | 制度 | 代表站 | 关键技术 | 什么时候用 |
|---|---|---|---|---|
| `baseline/editorial/` | 编辑叙事 | lando / basement / darkroom | 贴边大字、1px 分隔线、非对称列、sticky 横向、遮罩掀字 | 品牌站 / 作品集 / 叙事页 |
| `baseline/immersive/` | 3D 沉浸 | bruno / lusion / igloo | three.js、程序化 envMap、硬光箱、滚动驱动相机 | 有 3D 资产、要展示空间 |
| `baseline/product/` | 产品精细 | vercel / linear / superlist | **不用 GSAP**，CSS transition + IntersectionObserver | SaaS / 定价 / 转化页 |

每套都是**单文件、零构建、CDN 引库**，双击就能看，改内容就能用。

设计上刻意做到三件事：

1. **零外链图片**（抽象构成用内联 SVG 生成），永不会因为图片 404 而毁掉版式判断
2. **单时钟**（Lenis 挂 `gsap.ticker`，`prioritize=true`），没有第二个 rAF
3. **全部有 reduced-motion 降级**

---

## 四、目录结构

```
web-motion-archive/
├── SKILL.md                     ★ 给 AI 的施工规范（含 frontmatter，可直接装）
├── README.md
├── docs/
│   ├── 00-diagnosis.md          ★ 六个病因（先读这篇）
│   ├── 01-taxonomy.md           三套制度的完整规格 + 判定树
│   ├── 02-aesthetic-fingerprint.md  ★ 28 站实测数值 + 可粘贴 CSS
│   ├── 03-motion-recipes.md     6 个动效配方（含真实片段）
│   ├── 04-webgl-recipes.md      3D 材质/光照/相机/shader
│   ├── 05-anti-patterns.md      ★ 30 条 AI 味清单
│   ├── 06-build-playbook.md     从需求到成品的 SOP
│   ├── 07-verification.md       12 项判据 + 逐项改法
│   └── 08-samples.md            26 个站总表
├── baseline/                    三套可运行基线
├── scripts/
│   ├── verify.mjs               ★ 验收（12 项）
│   ├── pack.sh                  打包精简子集
│   ├── fetch_static.py          阶段 1：抓取 + 技术栈指纹
│   ├── probe_type.mjs           阶段 2b：排版探针
│   ├── render.mjs               阶段 2：渲染 + 滚动差分
│   ├── extract_snippets.py      阶段 4：抽真实配置片段
│   ├── distributions.py         时长/错开/字重分布
│   └── summarise.py             汇总
├── data/
│   ├── tech.json                每站技术栈（bundle 内真实计数）
│   ├── type.json                每站字号序列/字族/色彩（浏览器实测）
│   ├── render.json              每站页面高度/canvas/滚动驱动元素
│   ├── timing.json              duration/stagger/字重 分布
│   ├── webgl.json               3D 参数（fov/roughness/DPR/bloom）
│   ├── matrix.json              综合矩阵
│   └── snippets/*.txt           ★ 28 站的真实代码片段原文
├── shots/                       28 站截图（每站 2 帧）
└── raw/                         原始 HTML（bundle 已提取，可删）
```

---

## 五、四条最反直觉的实测结论

**① vercel / linear / superlist 的 GSAP 缓动是 0 次。**
它们的审美不低于 lando。→ "高级感"不等于"上 GSAP"。

**② 26 个站的 `pin: true` 合计出现 0 次。**
横向滚动全部用 `position: sticky`。→ 用 pin 做横向是过时做法。

**③ 大标题字重是 400–600，不是 700+。**
实测 279 处声明：500（34%）、400（31%）、700 只占 9%。
vercel 的 64px 标题是 `w400`，terminal 是 `w400`，cuberto 是 `w500`。
→ "标题要粗"是错的。

**④ 主流 stagger 是 15–30ms，不是 80ms。**
103 处 stagger：0.02s（33 次）、0.015s（20 次）、0.03s（12 次）。
→ 我之前给过"块级 80ms"的建议，是偏慢的。

---

## 六、方法（可复现，不是"我看了一下"）

```
1. 抓 30 个站（curl，走代理），提取 js/css 链接，下载 bundle
2. 正则统计特征词（gsap/lenis/three/ogl/shader…）+ 参数（lerp/scrub/ease/fov…）
3. 无头 Chrome 渲染，抓 getComputedStyle（字号序列/字族/色彩/圆角/阴影）
4. 滚到 5 个位置做差分，反推"哪些元素被滚动驱动"
5. Puppeteer 截图，人工看构图（数字测不出构图）
6. 用脚本生成表格，人工写"值得学的一点"
```

`scripts/` 里每个阶段一个脚本，都能重跑。

**数据边界（必须说清）：**

- 抓取时间 **2026-10-25**。`offer.studio` 和 `unseen.studio` 当时已是域名停放页（`/lander`），样本用 6 个替代站补足。
- `raw/` 里的 bundle 已按需删除（42MB），但所有配置片段已提取到 `data/snippets/`。
- 字号/色彩是**渲染后实测**，不是读 CSS 源码——所以能反映真实的层叠结果。

---

## 七、这份材料做不到什么

必须说清楚，否则你会再次失望：

| 期望 | 现实 |
|---|---|
| "AI 装了就自动有审美" | ❌ 它只会**不犯那 30 个错**，不会自己发明视觉语言 |
| "什么需求都能做出 lando 水准" | ❌ lando 的水准 60% 来自它的**内容**（照片、人物、时间线）。换成你的内容，同参数也到不了 |
| "照抄数值就行" | ❌ 数值只在正确的结构里成立。先有结构，再谈数值 |
| "一次生成就完美" | ❌ 需要"改一处 → 跑验收 → 截图对比"的循环 |

**它能保证的是：**

✅ 给出的是**结构正确、比例正确、细节到位**的页面，不会是"模板味"
✅ 不会犯 30 个可识别的 AI 味错误
✅ 用真实范例的写法，而不是模型的记忆
✅ 每一步都有可测的判据，而不是"感觉"

---

## 八、从哪开始

```
第 1 步  读 docs/00-diagnosis.md          （10 分钟，理解为什么）
第 2 步  打开 baseline/editorial/index.html （看目标长什么样）
第 3 步  把 SKILL.md 发给你的 AI           （让它按流程走）
第 4 步  它交付后跑 scripts/verify.mjs     （看哪项没过）
```

---

*抓取与实测：2026-10-25。所有数值可在 `data/` 里追溯。*
