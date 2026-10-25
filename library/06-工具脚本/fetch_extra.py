#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""补抓替代站，并合并进 tech.json（不覆盖已有的）"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from fetch_static import one, DATA

EXTRA = [
    ("islands",  "https://14islands.com"),
    ("monks",    "https://www.mediamonks.com"),
    ("cuberto",  "https://cuberto.com"),
    ("waaark",   "https://waaark.com"),
    ("terminal", "https://terminal-industries.com"),
    ("superlist", "https://www.superlist.com"),
]

path = os.path.join(DATA, "tech.json")
doc = json.load(open(path, encoding="utf-8"))
have = {s["name"] for s in doc["sites"]}

for site in EXTRA:
    if site[0] in have:
        continue
    rec = one(site)
    doc["sites"].append(rec)

json.dump(doc, open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
ok = sum(1 for s in doc["sites"] if s.get("ok"))
print(f"\n合计 {ok}/{len(doc['sites'])} 成功")
