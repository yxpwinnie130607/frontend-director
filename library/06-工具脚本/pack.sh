#!/bin/bash
# 打包「发给另一个 AI」的精简子集
# 只读原目录，不删除任何东西；输出到 dist/handoff-YYYY-MM-DD/
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STAMP="$(date +%Y-%m-%d-%H%M)"
OUT="$ROOT/dist/handoff-$STAMP"

mkdir -p "$OUT"/{docs,baseline,scripts,data/snippets,shots}

# 1. skill 本体
cp "$ROOT/SKILL.md" "$OUT/"

# 2. 八份文档
cp "$ROOT"/docs/*.md "$OUT/docs/"

# 3. 三套可运行基线
cp -R "$ROOT"/baseline/* "$OUT/baseline/"

# 4. 验收脚本（唯一必需的脚本；其余是复现用，可不发）
cp "$ROOT/scripts/verify.mjs" "$OUT/scripts/"

# 5. 原始数据（json 很小，全带）
cp "$ROOT"/data/*.json "$OUT/data/" 2>/dev/null || true

# 6. 真实配置片段（这是"给模型看的范例"，最重要的一批）
cp "$ROOT"/data/snippets/*.txt "$OUT/data/snippets/" 2>/dev/null || true

# 7. 精选视觉参照：每站只带首屏，且限 12 个站
for n in lando darkroom basement terminal cuberto lusion linear vercel family superlist abhishek ojo; do
  for f in "$ROOT"/shots/"$n"-00.png; do
    [ -f "$f" ] && cp "$f" "$OUT/shots/"
  done
done

# 7b. 压缩副本（只动 dist 里的拷贝，不碰原图）
for f in "$OUT"/shots/*.png; do
  [ -f "$f" ] && sips -Z 1440 "$f" >/dev/null 2>&1 || true
done

# 8. 一份给人看的入口
cat > "$OUT/README-HANDOFF.md" <<'MD'
# 这份材料怎么用

你拿到的是一个「动效与审美施工包」。目标不是"读"，是让 AI **照着做**。

## 给 AI 的安装顺序

1. 把 `SKILL.md` 放到 skill 目录（或直接作为 system prompt 的一部分）。
2. 把整个 `baseline/`、`docs/`、`data/snippets/` 放在同一层，`SKILL.md` 里用相对路径引用它们。
3. 把 `scripts/verify.mjs` 放在项目里，交付前跑一次。

## 三句话说明它的机制

- **`SKILL.md`** 是强制流程：定制度 → 复制基线 → 套数值 → 加一个签名动作 → 跑验收。
- **`baseline/`** 是三套可运行成品（编辑型 / 3D 型 / 产品型）。AI 不许从零写，只能从这三套改。
- **`docs/02`** 里的数字是 28 个真实站点的浏览器实测值，用来替换"高级""有质感"这类无效描述。

## 如果只发一个文件

发 `SKILL.md`。它自带走完流程所需的全部判据。
其余是"当 AI 需要证据时的原始材料"。

## 最低验证

```
node scripts/verify.mjs baseline/editorial/index.html
```

三套基线都是 11/11 通过。你改完自己的页面后，用同一条命令对比。
MD

# 体积汇报
SIZE=$(du -sh "$OUT" | cut -f1)
COUNT=$(find "$OUT" -type f | wc -l | tr -d ' ')
echo "──────────────────────────────────────────────"
echo "  输出：$OUT"
echo "  文件：$COUNT 个  体积：$SIZE"
echo "──────────────────────────────────────────────"
du -sh "$OUT"/* | sort -rh
