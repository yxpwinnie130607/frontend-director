# START HERE · 怎么让 AI 做出 Lando 那种效果

这个包只为一件事：**让接手的 AI 产出接近 landonorris.com 的页面。**

34 个文件，2.7MB。不含任何原始 bundle、不含无关样本。

---

## 一、先看这四行

```
SKILL.md              ★ 强制流程（定制度→复制基线→套数值→加签名动作→验收）
baseline/editorial/   ★ 目标长什么样（直接双击打开）
react/motion/         ★ 在 React/Next 里怎么落地（8 个效果 + 2 个 hook + 底座）
data/*.txt            ★ 别人怎么写的（5 个站的真实配置原文）
```

其余是解释和验收。

---

## 二、给 AI 的开场指令（直接粘贴）

```
你要用这套材料做一个网页。先读 SKILL.md，然后严格按它的五步流程走，不要跳步。

三条硬性要求：

1. 不许从零写。必须复制 baseline/editorial/index.html 作为起点，
   在此基础上替换内容和配色。如果你重新组织结构，视为失败。

2. 不许用形容词描述你的方案。所有视觉决定必须给出具体数值
   （字号、字距、行高、时长、错开、强调色数量），数值取自
   docs/02-aesthetic-fingerprint.md 的实测表。

3. 交付前必须跑 node scripts/verify.mjs <你的文件>，
   11 项自测全部通过才算完成。不过就改。

我的项目技术栈是 Next.js + React。如果要复用组件，
从 react/motion/ 里取（SmoothScroll / MaskReveal / HorizontalTrack /
Parallax / Magnetic / Marquee / StaggerGrid / PinScene / VelocitySkew），
不要自己重写这些效果。
```

---

## 三、两个目录的分工（别搞混）

| 目录 | 它回答什么 | 什么时候用 |
|---|---|---|
| `baseline/editorial/` | **长什么样** —— 贴边大字、1px 分隔线、非对称列、sticky 横向 | 需要看目标形态、或做纯静态站 |
| `baseline/immersive/` | **3D 怎么做** —— three.js、程序化光箱、滚动驱动相机 | 有 3D 资产时 |
| `react/motion/` | **在 React 里怎么写** —— 每个效果一个组件，含清理逻辑 | 你的项目是 React/Next |

`react/motion/` 里每个组件都做了两件 HTML 版做不到的事：

1. `useEffect` 返回清理函数（`ScrollTrigger.kill()`、`gsap.context().revert()`），避免路由切换后动画残留
2. 用 `useRef` 持有 timeline，不依赖全局变量

**如果你的 AI 直接照 HTML 基线写 React，它会漏掉这两点**——页面能跑，但切页面会出问题。

---

## 四、三个最容易做错的地方

**① 把 lando 的密度照搬。**
它有 479 处缓动、117 处 scrub，因为它是 12 个 section、21 个 canvas 的叙事页。
你的页面如果有 5 个区块，滚动配置应该在 8–15 个，不是 100 个。

**② 以为"加 3D"就是 lando。**
lando 的 3D 只占视觉的 30%。另外 70% 是排版（字号比 6.47、字距 −0.02em、贴边、1px 线）和照片。
**先把排版做对，再往里塞 3D。顺序反了就是模板。**

**③ 忽略"一个签名动作"。**
lando 能记住，是因为它有 Rive 动画、自定义光标、扫描线——但每一样都和内容有关。
不要做"粒子背景 + 光标跟随 + 渐变光晕"三件套，那是最容易被识别为 AI 生成的东西。

---

## 五、验收怎么读

```
node scripts/verify.mjs baseline/editorial/index.html
```

11 项数字 + 1 项人工。重点看这三项：

```
2  字号比 ≥ 4.0        ← 低于 3 就是"温吞的层级"
3  非中性色 ≤ 2        ← 超过 2 个就是"后台管理面板"
8  时长档位 1–6        ← 超过 6 种说明没有节奏制度
```

第 12 项（签名动作）测不出来，要你自己看：**把这个动作换成"淡入"，页面会变差吗？** 不会就删掉。

---

## 六、文件清单

```
START-HERE.md                 本文件
SKILL.md                      skill 本体（含 frontmatter，可直接装）
docs/
  00-diagnosis.md             为什么要这么做（六个病因）
  01-taxonomy.md              三套制度 + 判定树
  02-aesthetic-fingerprint.md ★28 站实测数值 + 可粘贴 CSS
  03-motion-recipes.md        6 个动效配方（含真实片段）
  04-webgl-recipes.md         3D 材质/光照/相机
  05-anti-patterns.md         ★30 条 AI 味清单
  06-build-playbook.md        施工 SOP
  07-verification.md          12 项判据 + 逐项改法
baseline/
  editorial/index.html        ★编辑叙事型（单文件，双击可开）
  immersive/index.html        3D 沉浸型
react/
  motion/                     SmoothScroll + 8 个效果组件 + 2 个 hook + index
  styles-reference.css        这些组件的配套样式
data/
  lando.txt                   5.5MB bundle 里抽出的真实配置
  basement.txt
  terminal.txt
  cuberto.txt
  darkroom.txt
scripts/
  verify.mjs                  12 项验收
shots/
  lando-00/45, basement-00/45 视觉参照（如果你的 AI 支持看图）
```

---

## 七、一句话

**这个包能让它做出"结构正确的 lando"，做不出"lando"。**

差的不是文件，是内容——见下一条。

---

## 八、文件之外还差什么（重要）

lando 的水准 60% 来自内容：

- 专业 F1 摄影（多机位、4:3 与 16:9 混排）
- 真实的人物叙事（"It doesn't matter where you start, it's how you progress from there."）
- 21 个媒体元素（照片 / 视频 / WebGL）

如果你的页面内容是"三个功能卡片 + 一段产品介绍"，**再好的 skill 也做不出那个层次**——因为没有足够的视觉素材撑起非对称版式。

所以真正该准备的是：

```
□ 至少 6–10 张高质量图片（能错落排布的尺寸比例）
□ 一句能被记住的话（不是"赋能创作者"这种）
□ 一个具体的数字（不是"10x 提效"，是"42 篇样本"）
□ 一个真的能用鼠标操作的交互点
```

**没有这些，先别谈 lando 的效果。**


---

## 九、怎么验证"你的 AI 写出来的 skill"是对的

如果你的 AI 的任务是**写/改一个 skill**（而不是直接做页面），那有个问题：
**你怎么知道它写的 skill 比原来那个好？**

不要看文档写得多漂亮，用这个闭环：

### 四步验证

```
1. 让它用新写的 skill，做同一个需求三次（换三个主题，比如咖啡店 / 开发者工具 / 摄影工作室）
2. 每次交付后跑：node scripts/verify.mjs <产物>
3. 把三次的截图和 baseline/editorial/index.html 并排
4. 三条都要满足：
   □ 11 项数字全过
   □ 版式没有退回"三列卡片 + 居中标题 + 渐变"
   □ 字号比 ≥ 5（编辑型）
```

### 判断标准

| 现象 | 说明 skill 的问题在哪 |
|---|---|
| 三次都过，但版式几乎一样 | skill 里**只有模板没有制度判定**，它在复制而不是选择 |
| 数字过了但看起来还是"AI 味" | skill 缺**禁令**（`docs/05-anti-patterns.md` 的 30 条） |
| 换了主题就崩 | skill 缺**内容无关的结构**（structure 依赖具体文案） |
| 第一次好，第二次差 | skill 缺**强制脚手架**（它在自由发挥，没有复制基线） |

### 一句关键

**skill 的质量不体现在它写了什么，体现在"用了它的产物能不能过验收"。**

所以给 AI 的任务描述里要包含这句话：

```
你写完 skill 之后，必须用它生成三个不同主题的页面，
每个都跑 verify.mjs，并把结果贴出来。11 项没过就回去改 skill，
不要改产物。
```

**改 skill，不改产物**——这一条能防止它"手工修出一个好看的页面"来糊弄验收。
