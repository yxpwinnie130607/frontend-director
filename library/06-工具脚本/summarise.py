#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
阶段 3：把 tech.json + render.json 汇成可引用的指标表
关键派生指标（这些才是能移植的"审美"）：
  displayRatio = h1 字号 / 正文字号      —— 张力
  lineHeight   = h1 行高 / h1 字号        —— 紧凑度
  tracking     = h1 字距（em 归一化）      —— 精密感
  accentCount  = 非中性色数量              —— 克制度
  radiusMode   = 圆角众数                  —— 硬/柔
  shadowKind   = 硬投影 / 柔投影 / 无
  drivenPerVh  = 滚动驱动元素数 / 页高    —— 编排密度
"""
import json
import os
import re
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")

tech = json.load(open(os.path.join(DATA, "tech.json"), encoding="utf-8"))["sites"]
render = {}
rp = os.path.join(DATA, "render.json")
if os.path.exists(rp):
    for s in json.load(open(rp, encoding="utf-8"))["sites"]:
        render[s["name"]] = s

TECH = tech


def px(v):
    m = re.match(r"(-?[\d.]+)px", str(v or ""))
    return float(m.group(1)) if m else None


def em(tracking, size):
    t = px(tracking)
    if t is None or not size:
        return None
    return round(t / size, 4)


def is_neutral(rgb):
    m = re.findall(r"[\d.]+", rgb or "")
    if len(m) < 3:
        return True
    r, g, b = (float(x) for x in m[:3])
    mx, mn = max(r, g, b), min(r, g, b)
    return (mx - mn) < 22          # 饱和度极低 → 中性


def shadow_kind(s):
    """硬投影 = 偏移大、模糊小；柔投影 = 模糊远大于偏移"""
    nums = [float(x) for x in re.findall(r"-?[\d.]+", s or "")]
    if len(nums) < 4:
        return None
    ox, oy, blur = nums[0], nums[1], nums[2]
    return "hard" if blur <= max(abs(ox), abs(oy)) * 1.2 + 1 else "soft"


rows = []
for t in TECH:
    r = render.get(t["name"], {})
    m = r.get("metrics") or {}
    ty = m.get("typography") or {}
    h1 = ty.get("h1") or {}
    body = ty.get("body") or {}
    pal = m.get("palette") or {}

    h1s = h1.get("fontSize")
    bs = body.get("fontSize")
    ratio = round(h1s / bs, 2) if h1s and bs else None

    lh = None
    if h1.get("lineHeight") and h1.get("lineHeight") not in ("normal", "auto"):
        v = px(h1["lineHeight"])
        if v and h1s:
            lh = round(v / h1s, 3)

    track = em(h1.get("letterSpacing"), h1s)

    accents = 0
    for c in (pal.get("text") or [])[:6]:
        if not is_neutral(c["v"]):
            accents += 1

    radii = pal.get("radius") or []
    radius_mode = radii[0]["v"] if radii else "0px"

    sk = None
    for s in (pal.get("shadows") or [])[:3]:
        k = shadow_kind(s["v"])
        if k:
            sk = k
            break

    dh = m.get("docHeight") or 0
    driven = r.get("scrollDrivenCount") or 0
    per_vh = round(driven / (dh / 900), 2) if dh else None

    rows.append({
        "name": t["name"],
        "url": t["url"],
        "ok": bool(r.get("ok")),
        "title": (t.get("title") or "")[:48],
        "libs": t.get("features") or {},
        "bundle_kb": round((t.get("bundle_bytes") or 0) / 1024),
        "h1_px": h1s,
        "body_px": bs,
        "displayRatio": ratio,
        "h1_lh": lh,
        "h1_tracking_em": track,
        "h1_family": h1.get("family"),
        "body_family": (ty.get("fonts") or [{}])[0].get("v"),
        "h1_width_ratio": h1.get("widthRatio"),
        "weights": [w["v"] for w in (ty.get("weights") or [])[:3]],
        "font_count": len(ty.get("fonts") or []),
        "accentCount": accents,
        "bg": (pal.get("bg") or [{}])[0].get("v") if pal.get("bg") else None,
        "text": (pal.get("text") or [{}])[0].get("v") if pal.get("text") else None,
        "radius": radius_mode,
        "shadow": sk,
        "sections": m.get("sections"),
        "docHeight": dh,
        "canvases": len(m.get("canvases") or []),
        "gl": next((c["kind"] for c in (m.get("canvases") or []) if c["kind"].startswith("webgl")), None),
        "videos": m.get("videos"),
        "scrollDriven": driven,
        "drivenPerViewport": per_vh,
        "breakpoints": m.get("breakpoints") or [],
        "libs_live": m.get("libs") or {},
    })

json.dump(rows, open(os.path.join(DATA, "matrix.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)

# ---------- 打印两张速查表 ----------
print("=" * 118)
print("表 A · 技术栈（bundle 内真实出现次数）")
print("=" * 118)
head = f"{'site':11s} {'bundle':>7s} {'gsap':>5s} {'lenis':>5s} {'three':>5s} {'ogl':>4s} {'pixi':>4s} {'rive':>4s} {'shader':>6s} {'framer':>6s} {'live':>5s}"
print(head)
for r in rows:
    L = r["libs"]
    live = r["libs_live"]
    live_s = "gsap" if live.get("gsap") else ("lenis" if live.get("Lenis") else "-")
    print(f"{r['name']:11s} {r['bundle_kb']:>6d}K "
          f"{L.get('gsap',0):>5d} {L.get('lenis',0):>5d} {L.get('three',0):>5d} "
          f"{L.get('ogl',0):>4d} {L.get('pixi',0):>4d} {L.get('rive',0):>4d} "
          f"{L.get('shader',0):>6d} {L.get('framer',0):>6d} {live_s:>5s}")

print()
print("=" * 118)
print("表 B · 审美指纹（渲染后实测）")
print("=" * 118)
print(f"{'site':11s} {'h1':>4s} {'body':>4s} {'ratio':>5s} {'lh':>5s} {'track':>7s} {'h1W':>5s} {'acc':>3s} "
      f"{'radius':>9s} {'shadow':>6s} {'gl':>7s} {'drvn':>4s}")
for r in rows:
    if not r["ok"]:
        print(f"{r['name']:11s}  (未渲染)")
        continue
    print(f"{r['name']:11s} {str(r['h1_px'] or '-'):>4s} {str(r['body_px'] or '-'):>4s} "
          f"{str(r['displayRatio'] or '-'):>5s} {str(r['h1_lh'] or '-'):>5s} "
          f"{str(r['h1_tracking_em'] or '-'):>7s} {str(r['h1_width_ratio'] or '-'):>5s} "
          f"{str(r['accentCount']):>3s} {str(r['radius'])[:9]:>9s} {str(r['shadow'] or '-'):>6s} "
          f"{str(r['gl'] or '-'):>7s} {str(r['scrollDriven']):>4s}")

# ---------- 众数 ----------
print()
def mode(key, pred=lambda x: x is not None):
    vals = [r[key] for r in rows if r["ok"] and pred(r.get(key))]
    return Counter(vals).most_common(4) if vals else []

print("displayRatio 众数:", mode("displayRatio"))
print("h1 行高比 众数 :", mode("h1_lh"))
print("h1 字距(em) 众数:", mode("h1_tracking_em"))
print("accentCount 分布:", Counter(r["accentCount"] for r in rows if r["ok"]))
print("shadow 分布     :", Counter(r["shadow"] for r in rows if r["ok"]))
print("gl 分布         :", Counter(r["gl"] for r in rows if r["ok"]))
