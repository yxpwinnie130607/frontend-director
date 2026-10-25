#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
阶段 1：静态抓取 + bundle 技术栈指纹
- 抓 HTML
- 提取 js/css 链接，下载最大的几个 bundle
- 统计特征词（库名 / 参数 / 技术路径）
- 正则抽取真实数值（lerp / scrub / ease / fov / damping ...）
输出：data/tech.json
"""
import json
import os
import re
import subprocess
import concurrent.futures as cf
from urllib.parse import urljoin, urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "raw")
DATA = os.path.join(ROOT, "data")
PROXY = "http://127.0.0.1:7890"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36")

SITES = [
    ("lando",      "https://landonorris.com"),
    ("ojo",        "https://ojo.art"),
    ("offer",      "https://offer.studio"),
    ("igloo",      "https://igloo.inc"),
    ("active",     "https://active-theory.com"),
    ("freight",    "https://www.studio-freight.com"),
    ("darkroom",   "https://darkroom.engineering"),
    ("lusion",     "https://lusion.co"),
    ("resn",       "https://www.resn.co.nz"),
    ("bruno",      "https://bruno-simon.com"),
    ("basement",   "https://basement.studio"),
    ("daybreak",   "https://daybreak.studio"),
    ("mercury",    "https://mercury.com"),
    ("linear",     "https://linear.app"),
    ("vercel",     "https://vercel.com"),
    ("family",     "https://family.co"),
    ("apple",      "https://www.apple.com"),
    ("rauno",      "https://rauno.me"),
    ("unit9",      "https://www.unit9.com"),
    ("ustwo",      "https://www.ustwo.com"),
    ("ponney",     "https://ponney.studio"),
    ("unseen",     "https://unseen.studio"),
    ("abhishek",   "https://abhishek.design"),
    ("locomotive", "https://locomotive.ca"),
]

# 特征词：用来判断技术路线
FEATURES = {
    "lenis":        [r"\bLenis\b", r"smoothWheel", r"touchMultiplier"],
    "gsap":         [r"\bgsap\b", r"ScrollTrigger", r"scrollTrigger"],
    "three":        [r"\bTHREE\b", r"WebGLRenderer", r"BufferGeometry"],
    "ogl":          [r"\bogl\b", r"Program\(", r"Renderer\{"],
    "pixi":         [r"\bPIXI\b", r"pixi\.js"],
    "regl":         [r"\bregl\b"],
    "rive":         [r"\brive\b", r"RiveCanvas"],
    "framer":       [r"framer-motion", r"motion/react", r"\bmotion\.div"],
    "barba":        [r"\bbarba\b"],
    "locomotive":   [r"locomotive-scroll", r"LocomotiveScroll"],
    "curtains":     [r"curtainsjs", r"Curtains\("],
    "spline":       [r"splinetool", r"@splinetool"],
    "tumult":       [r"tumult", r"himalaya"],
    "shader":       [r"gl_FragColor", r"fragmentShader", r"uniforms", r"varying vec"],
    "postprocessing": [r"EffectComposer", r"RenderPass", r"bloom"],
    "scrolltrigger_pin": [r"pin:\s*true"],
    "gsap_ticker":  [r"gsap\.ticker"],
    "quickto":      [r"quickTo\("],
    "willchange":   [r"will-change"],
    "clip_path":    [r"clip-path", r"clipPath"],
    "css_3d":       [r"perspective", r"translate3d", r"rotateY"],
    "lottie":       [r"lottie"],
    "matter":       [r"\bMatter\b"],
    "rapier":       [r"rapier"],
    "cannon":       [r"CANNON"],
}

NUM_PATTERNS = {
    "lerp":            r"lerp\s*[:=]\s*([0-9.]+)",
    "scrub_num":       r"scrub\s*:\s*([0-9.]+)",
    "touchMultiplier": r"touchMultiplier\s*:\s*([0-9.]+)",
    "wheelMultiplier": r"wheelMultiplier\s*:\s*([0-9.]+)",
    "duration":        r"duration\s*:\s*([0-9.]+)",
    "stagger":         r"stagger\s*:\s*([0-9.]+)",
    "fov":             r"fov\s*:\s*([0-9.]+)",
    "damping":         r"damping\s*[:=]\s*([0-9.]+)",
    "ease_cubic":      r"cubic-bezier\(([^)]{6,40})\)",
    "ease_name":       r"ease\s*:\s*['\"]([a-z0-9.]+)['\"]",
}


def curl(url, out=None, timeout=30, head=False):
    cmd = ["curl", "-sS", "-L", "--compressed", "-m", str(timeout),
           "-A", UA, "-x", PROXY]
    if head:
        cmd += ["-I"]
    if out:
        cmd += ["-o", out]
    cmd.append(url)
    try:
        if out:
            r = subprocess.run(cmd, capture_output=True, timeout=timeout + 8)
            return r.returncode == 0 and os.path.exists(out) and os.path.getsize(out) > 0
        r = subprocess.run(cmd, capture_output=True, timeout=timeout + 8)
        return r.stdout
    except Exception:
        return None if out else b""


def extract_assets(html, base):
    js = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', html)
    css = re.findall(r'<link[^>]+href=["\']([^"\']+\.css[^"\']*)["\']', html)
    pre = re.findall(r'<link[^>]+rel=["\'](?:modulepreload|preload)["\'][^>]+href=["\']([^"\']+\.m?js[^"\']*)["\']', html)
    seen, out = set(), []
    for u in js + pre + css:
        if u.startswith("data:") or u.startswith("#"):
            continue
        full = urljoin(base, u)
        if full in seen:
            continue
        seen.add(full)
        out.append(full)
    return out


def analyse_text(txt):
    hits = {}
    for name, pats in FEATURES.items():
        n = 0
        for p in pats:
            n += len(re.findall(p, txt))
        if n:
            hits[name] = n

    nums = {}
    for name, pat in NUM_PATTERNS.items():
        vals = re.findall(pat, txt)
        if not vals:
            continue
        from collections import Counter
        c = Counter(vals)
        nums[name] = [[v, n] for v, n in c.most_common(6)]
    return hits, nums


def one(site):
    name, url = site
    d = os.path.join(RAW, name)
    os.makedirs(d, exist_ok=True)
    html_path = os.path.join(d, "index.html")
    rec = {"name": name, "url": url, "ok": False}

    if not curl(url, html_path, timeout=30):
        rec["error"] = "fetch failed"
        return rec

    html = open(html_path, "rb").read().decode("utf-8", "replace")
    rec["ok"] = True
    rec["html_bytes"] = len(html)
    rec["title"] = (re.findall(r"<title[^>]*>(.*?)</title>", html, re.S) or [""])[0].strip()[:90]

    assets = extract_assets(html, url)
    rec["asset_count"] = len(assets)

    # 内联脚本也算（很多站把 gsap 参数写在内联 module 里）
    inline = "\n".join(re.findall(r"<script[^>]*>(.*?)</script>", html, re.S))
    hits, nums = analyse_text(html)

    # 下载前几个 bundle（跳过明显是 vendor 巨物以外的都拿）
    got, bundle_text = [], ""
    for i, a in enumerate(assets[:10]):
        ext = os.path.splitext(urlparse(a).path)[1].lower()
        if ext not in (".js", ".mjs", ".css"):
            continue
        fn = os.path.join(d, f"asset{i:02d}{ext}")
        if not curl(a, fn, timeout=40):
            continue
        size = os.path.getsize(fn)
        if size > 12 * 1024 * 1024:
            os.remove(fn)
            continue
        got.append({"url": a, "bytes": size, "file": os.path.basename(fn)})
        try:
            bundle_text += open(fn, "rb").read().decode("utf-8", "replace")
        except Exception:
            pass

    rec["assets"] = got
    rec["bundle_bytes"] = len(bundle_text)
    bh, bn = analyse_text(bundle_text)
    ih, inum = analyse_text(inline)

    merged = dict(hits)
    for k, v in bh.items():
        merged[k] = merged.get(k, 0) + v
    for k, v in inum.items():
        if k not in nums:
            nums[k] = v
    for k, v in bn.items():
        if k not in nums:
            nums[k] = v
        else:
            # 合并计数
            acc = {a: b for a, b in nums[k]}
            for a, b in v:
                acc[a] = acc.get(a, 0) + b
            nums[k] = sorted(acc.items(), key=lambda x: -x[1])[:6]

    rec["features"] = merged
    rec["numbers"] = nums
    rec["has_inline_module"] = 'type="module"' in html
    print(f"[ok] {name:11s} html {len(html):>7d}  bundle {len(bundle_text):>9d}  "
          f"libs={','.join(sorted(merged))[:70]}")
    return rec


def main():
    os.makedirs(DATA, exist_ok=True)
    results = []
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        for rec in ex.map(one, SITES):
            results.append(rec)
    ok = [r for r in results if r.get("ok")]
    json.dump({"generated": "2026-10-25", "sites": results},
              open(os.path.join(DATA, "tech.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    print(f"\n=== {len(ok)}/{len(SITES)} 抓取成功 ===")


if __name__ == "__main__":
    main()
