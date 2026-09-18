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
        print(f"Error: Directory '{target_dir}' does not exist.")
        sys.exit(1)

    files = os.listdir(target_dir)

    json_files = [f for f in files if f.lower().endswith(".json")]
    if len(json_files) != 1:
        print(f"Error: Found {len(json_files)} JSON files. Expected exactly 1.")
        sys.exit(1)

    json_path = os.path.join(target_dir, json_files[0])

    # 1. Read existing JSON data without clearing or defaulting to empty on parse errors
    with open(json_path, "r", encoding="utf-8") as f:
        content = f.read().strip()
        if not content:
            existing_data = []
        else:
            try:
                existing_data = json.loads(content)
            except json.JSONDecodeError as e:
                print(f"Aborting: Invalid JSON in '{json_path}': {e}")
                sys.exit(1)

    if not isinstance(existing_data, list):
        print(f"Aborting: Root of '{json_files[0]}' must be an array/list.")
        sys.exit(1)

    # 2. Collect existing filenames (exact match)
    existing_filenames = set()
    for item in existing_data:
        if isinstance(item, dict) and "filename" in item and item["filename"]:
            existing_filenames.add(item["filename"])

    # 3. Find JPEG files in the directory
    jpegs = [f for f in files if f.lower().endswith((".jpg", ".jpeg"))]

    new_entries = []
    for filename in sorted(jpegs):
        if filename not in existing_filenames:
            full_path = os.path.join(target_dir, filename)
            date, time_str, camera = extract_exif(full_path)

            new_entries.append(
                {
                    "filename": filename,
                    "name": "",
                    "description": "",
                    "date": date,
                    "time": time_str,
                    "camera": camera,
                }
            )

    # 4. Only write to disk if there are genuinely new items to append
    if not new_entries:
        print("No new JPEG files found. JSON untouched.")
        return

    # Append new items directly to the untouched existing data list
    updated_data = existing_data + new_entries

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(updated_data, f, indent=4, ensure_ascii=False)

    print(
        f"Retained {len(existing_data)} existing entries, appended {len(new_entries)} new entries to {json_files[0]}."
    )


if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    process_directory(target)
