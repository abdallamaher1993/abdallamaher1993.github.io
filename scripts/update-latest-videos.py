#!/usr/bin/env python3
"""Regenerate js/latest-videos.js from the channel's public YouTube feed.

No API key is needed. Run by .github/workflows/update-latest-videos.yml.
"""
import datetime as dt
import json
import sys
import urllib.request
import xml.etree.ElementTree as ET

CHANNEL_ID = "UCkMLbf6BLoqapmfbDECYVtQ"
FEED = "https://www.youtube.com/feeds/videos.xml?channel_id=" + CHANNEL_ID
OUT = "js/latest-videos.js"
LIMIT = 8
NS = {
    "a": "http://www.w3.org/2005/Atom",
    "yt": "http://www.youtube.com/xml/schemas/2015",
}


def ago(published: dt.datetime, now: dt.datetime) -> str:
    days = max((now - published).days, 0)
    if days < 1:
        return "today"
    if days == 1:
        return "1 day ago"
    if days < 7:
        return f"{days} days ago"
    if days < 14:
        return "1 week ago"
    if days < 30:
        return f"{days // 7} weeks ago"
    months = days // 30
    return "1 month ago" if months == 1 else f"{months} months ago"


def main() -> int:
    req = urllib.request.Request(FEED, headers={"User-Agent": "latest-videos-updater"})
    with urllib.request.urlopen(req, timeout=30) as r:
        root = ET.fromstring(r.read())
    now = dt.datetime.now(dt.timezone.utc)
    items = []
    for e in root.findall("a:entry", NS)[:LIMIT]:
        vid = e.findtext("yt:videoId", namespaces=NS)
        title = (e.findtext("a:title", namespaces=NS) or "").strip()
        pub = e.findtext("a:published", namespaces=NS)
        if not vid or not title or not pub:
            continue
        published = dt.datetime.fromisoformat(pub.replace("Z", "+00:00"))
        items.append({
            "id": vid,
            "title": title,
            "thumb": f"https://i.ytimg.com/vi/{vid}/hqdefault.jpg",
            "published": ago(published, now),
        })
    if not items:
        print("feed returned no videos; leaving file untouched", file=sys.stderr)
        return 1
    lines = [
        f"/* Generated {now:%Y-%m-%d} from the channel RSS feed (public videos only)",
        "*/",
        "window.LATEST_VIDEOS = [",
    ]
    for i, it in enumerate(items):
        comma = "," if i < len(items) - 1 else ""
        lines.append("  " + json.dumps(it, ensure_ascii=False).replace('{"', '{ "', 1).replace('"}', '" }') + comma)
    lines.append("];")
    open(OUT, "w", encoding="utf-8").write("\n".join(lines) + "\n")
    print(f"wrote {len(items)} videos")
    return 0


if __name__ == "__main__":
    sys.exit(main())
