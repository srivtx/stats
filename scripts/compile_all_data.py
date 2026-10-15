#!/usr/bin/env python3
"""
Compiles all 4 curriculum groups and generates:
- src/data/playlistData.js
- src/data/modulesData.js
"""

import json
from curriculum_group1 import GROUP_1
from curriculum_group2 import GROUP_2
from curriculum_group3 import GROUP_3
from curriculum_group4 import GROUP_4

# Merge all groups
all_content = {}
all_content.update(GROUP_1)
all_content.update(GROUP_2)
all_content.update(GROUP_3)
all_content.update(GROUP_4)

print(f"Total curated video content definitions: {len(all_content)}")

with open('playlist_videos.json') as f:
    raw_videos = json.load(f)

compiled_playlist = []
for item in raw_videos:
    idx = item['index']
    vid = item['id']
    title = item['title']
    
    if idx not in all_content:
        raise ValueError(f"Missing definition for video index {idx}: {title}")
    
    c = all_content[idx]
    
    compiled_playlist.append({
        "index": idx,
        "id": vid,
        "title": title,
        "shortTitle": c.get("shortTitle", title),
        "moduleId": c["moduleId"],
        "category": c["category"],
        "duration": c.get("duration", "8:00"),
        "embedUrl": f"https://www.youtube-nocookie.com/embed/{vid}?rel=0",
        "youtubeUrl": f"https://www.youtube.com/watch?v={vid}&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index={idx}",
        "summary": c["summary"],
        "bamIntuition": c["bamIntuition"],
        "firstPrinciples": c["firstPrinciples"],
        "mathFormulas": c["mathFormulas"],
        "numericalExample": c["numericalExample"],
        "pythonCode": c["pythonCode"],
        "rCode": c["rCode"],
        "pitfalls": c["pitfalls"],
        "interactiveType": c["interactiveType"],
        "quiz": c.get("quiz", [])
    })

print(f"Compiled {len(compiled_playlist)} total videos.")

# Write src/data/playlistData.js
with open('src/data/playlistData.js', 'w') as f:
    f.write('// Comprehensive StatQuest Statistics Fundamentals Catalog (62 Videos)\n')
    f.write('export const playlistData = ' + json.dumps(compiled_playlist, indent=2) + ';\n')

print("Successfully written src/data/playlistData.js")
