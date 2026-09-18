"""
this looks in to the directory passed as an argument and extracts the information
from all the jpeg files puts them in the json file in the same directory.

information extracted: filename, date, time, device captured

this is for added new entries into photographs.json with just adding the jpeg files in the the folder and running this
"""

import json
import os
import sys

from PIL import Image
from PIL.ExifTags import TAGS


def extract_exif(file_path):
    date, time_str, camera = "", "", ""
    try:
        with Image.open(file_path) as img:
            raw_exif = img._getexif()
            if raw_exif:
                exif = {TAGS.get(k, k): v for k, v in raw_exif.items()}

                raw_dt = exif.get("DateTimeOriginal") or exif.get("DateTime", "")
                if raw_dt and " " in raw_dt:
                    parts = raw_dt.split(" ")
                    date = parts[0].replace(":", "-")
                    time_str = parts[1]

                camera = exif.get("Model", "")
    except Exception:
        pass

    return date, time_str, camera


def process_directory(target_dir):
    if not os.path.isdir(target_dir):
        print("Directory does not exist.")
        sys.exit(1)

    files = os.listdir(target_dir)

    json_files = [f for f in files if f.lower().endswith(".json")]
    if len(json_files) != 1:
        print("Error: The directory must contain exactly one JSON file.")
        sys.exit(1)

    json_path = os.path.join(target_dir, json_files[0])

    with open(json_path, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            data = []

    existing_filenames = {
        item.get("filename") for item in data if isinstance(item, dict)
    }

    jpegs = [f for f in files if f.lower().endswith((".jpg", ".jpeg"))]

    added_count = 0
    for filename in jpegs:
        if filename not in existing_filenames:
            full_path = os.path.join(target_dir, filename)
            date, time_str, camera = extract_exif(full_path)

            data.append(
                {
                    "filename": filename,
                    "name": "",
                    "description": "",
                    "date": date,
                    "time": time_str,
                    "camera": camera,
                }
            )
            added_count += 1

    if added_count > 0:
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)

    print(f"Added {added_count} new images to {json_files[0]}")


if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    process_directory(target)
