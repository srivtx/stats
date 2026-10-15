#!/usr/bin/env python3
"""
Full catalog generator for all 62 StatQuest videos.
"""
import json

def get_all_videos():
    # Load raw video list
    with open('playlist_videos.json') as f:
        raw = json.load(f)
    
    videos_dict = {}
    for item in raw:
        videos_dict[item['index']] = item
    
    return videos_dict

print("Video helper loaded.")
