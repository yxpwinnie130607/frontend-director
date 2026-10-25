#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
阶段 4：从 bundle 里抽取「真实调用片段」
min 化之后 gsap 变量名会变成 W/e，但对象键不会变，所以按键定位：
  scrollTrigger:{ ... }   → 一个完整滚动配置
  timeline({ ... })       → 一条时间线
  scrub: / ease: / stagger: / containerAnimation
输出：data/snippets.json + 每站一封 data/snippets/<name>.txt（给 AI 看的原文）
"""
import json
import os
import re
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "raw")
DATA = os.path.join(ROOT, "data")
OUT = os.path.join(DATA, "snippets")
os.makedirs(OUT, exist_ok=True)

tech = json.load(open(os.path.join(DATA, "tech.json"), encoding="utf-8"))["sites"]
tech = {s["name"]: s for s in tech if s.get("ok")}

# 括号配对取一段
def block(txt, start, maxlen=1400):
    """从 start 的 '{' 开始，配对到对应 '}'"""
    i = txt.find("{", start)
    if i < 0:
        return ""
    depth, j = 0, i
    while j < len(txt) and j - i < maxlen:
        c = txt[j]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return txt[max(0, start - 160):j + 1]
        j += 1
    return txt[max(0, start - 160):i + maxlen]

KEYS = ["scrollTrigger:", "ScrollTrigger.create(", "containerAnimation:",
        "scrub:", "ease:", "stagger:", "quickTo(", "timeline({",
        "gsap.set(", "matchMedia(", "pin:", "invalidateOnRefresh"]

result = {}
for name in sorted(tech):
    d = os.path.join(RAW, name)
    if not os.path.isdir(d):
        continue
    text = ""
    for fn in sorted(os.listdir(d)):
        if fn.endswith((".js", ".mjs")):
            try:
                text += open(os.path.join(d, fn), "rb").read().decode("utf-8", "replace")
            except Exception:
                pass
    if not text:
        continue

    found = defaultdict(list)
    for k in KEYS:
        for m in re.finditer(re.escape(k), text):
            s = block(text, m.start())
            s = re.sub(r"\s+", " ", s).strip()
            if 40 < len(s) < 900 and s not in found[k]:
                found[k].append(s)
            if len(found[k]) >= 6:
                break

    # 缓动与 scrub 分布（全量统计，不是抽样）
    raw_ease = re.findall(r'ease\s*:\s*"([a-zA-Z0-9.()]+)"', text)
    c = Counter(raw_ease)
    c = Counter({k: v for k, v in c.items()
                 if re.match(r"^[a-zA-Z][a-zA-Z0-9.]*(\([0-9.,]+\))?$", k)})
    scrubs = Counter(re.findall(r"scrub\s*:\s*(!0|!1|true|false|[0-9.]+)", text))
    starts = Counter(re.findall(r'start\s*:\s*"([^"]{0,24})"', text))
    ends = Counter(re.findall(r'end\s*:\s*"([^"]{0,24})"', text))
    pins = len(re.findall(r"pin\s*:\s*(!0|true)", text))

    result[name] = {
        "bytes": len(text),
        "ease": c.most_common(10),
        "scrub": scrubs.most_common(6),
        "start": starts.most_common(8),
        "end": ends.most_common(6),
        "pin_true": pins,
        "snippets": {k: v[:3] for k, v in found.items()},
    }

    # 每站一封原文，供 AI 直接阅读
    with open(os.path.join(OUT, f"{name}.txt"), "w", encoding="utf-8") as f:
        f.write(f"# {name} — {tech[name]['url']}\n# bundle {len(text)} bytes\n\n")
        f.write(f"ease 分布: {dict(c.most_common(10))}\n")
        f.write(f"scrub 分布: {dict(scrubs.most_common(6))}\n")
        f.write(f"start 分布: {dict(starts.most_common(8))}\n")
        f.write(f"pin:true 出现 {pins} 次\n\n")
        for k, vs in found.items():
            f.write(f"===== {k} =====\n")
            for v in vs[:3]:
                f.write(v + "\n\n")

json.dump(result, open(os.path.join(DATA, "snippets.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)

# 汇总打印
print(f"{'site':11s} {'eases':>6s} {'scrub':>6s} {'pin':>4s}  主要缓动")
for name, r in result.items():
    print(f"{name:11s} {sum(v for _, v in r['ease']):>6d} {sum(v for _, v in r['scrub']):>6d} "
          f"{r['pin_true']:>4d}  {', '.join(f'{k}×{v}' for k, v in r['ease'][:4])}")
