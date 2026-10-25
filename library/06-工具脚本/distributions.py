#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""补充统计：duration / stagger / 留白 / 圆角 / 字重 的真实分布"""
import json
import os
import re
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "raw")

def bundle_text(name):
    d = os.path.join(RAW, name)
    t = ""
    if not os.path.isdir(d):
        return t
    for fn in sorted(os.listdir(d)):
        if fn.endswith((".js", ".mjs", ".css")):
            try:
                t += open(os.path.join(d, fn), "rb").read().decode("utf-8", "replace")
            except Exception:
                pass
    return t

names = [n for n in sorted(os.listdir(RAW)) if os.path.isdir(os.path.join(RAW, n))]

DUR = Counter()
STG = Counter()
PAD = Counter()
WEIGHT = Counter()
per = {}

for n in names:
    t = bundle_text(n)
    if not t:
        continue
    # duration: 0.6 / duration:600
    d1 = [float(x) for x in re.findall(r"duration\s*:\s*(0?\.[0-9]+)", t)]
    d2 = [float(x) / 1000 for x in re.findall(r"duration\s*:\s*(\d{2,4})(?![\d.])", t) if 40 <= int(x) <= 4000]
    ds = [x for x in d1 + d2 if 0.05 <= x <= 4]
    for x in ds:
        DUR[round(x, 2)] += 1
    st = [float(x) for x in re.findall(r"stagger\s*:\s*(0?\.[0-9]+)", t)]
    for x in st:
        if 0.01 <= x <= 1:
            STG[round(x, 3)] += 1
    # CSS padding-top 的大值
    pads = [int(x) for x in re.findall(r"padding(?:-top|-bottom)?\s*:\s*(\d{2,3})px", t)]
    # 字重
    ws = re.findall(r"font-weight\s*:\s*(\d{3})", t)
    for w in ws:
        WEIGHT[w] += 1

    per[n] = {
        "duration_mode": Counter([round(x, 2) for x in ds]).most_common(4),
        "stagger_mode": Counter([round(x, 3) for x in st]).most_common(4),
        "n_duration": len(ds),
        "n_stagger": len(st),
    }

def show(c, label, n=14):
    tot = sum(c.values())
    print(f"\n== {label}（共 {tot} 次）")
    for v, k in c.most_common(n):
        bar = "█" * min(40, round(k / max(1, tot) * 120))
        print(f"  {str(v):>7s}  {k:>5d}  {bar}")

show(DUR, "duration（秒）")
show(STG, "stagger（秒）")
show(WEIGHT, "font-weight")

print("\n== 每站 duration 众数")
for n, v in per.items():
    if v["n_duration"]:
        print(f"  {n:11s} n={v['n_duration']:>4d}  {v['duration_mode']}   stagger={v['stagger_mode'][:2]}")

json.dump({"duration": DUR.most_common(30), "stagger": STG.most_common(20),
           "weight": WEIGHT.most_common(20), "per_site": per},
          open(os.path.join(ROOT, "data", "timing.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
