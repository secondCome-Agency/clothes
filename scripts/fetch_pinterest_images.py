import urllib.request
import urllib.parse
import json
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
}

queries = [
    'streetwear aesthetic t-shirt flat lay product',
    'streetwear aesthetic cargo pants flat lay',
    'streetwear aesthetic lower sweatpants flat lay',
    'streetwear aesthetic hoodie flat lay product',
    'minimalist aesthetic clothes flat lay streetwear',
    'vintage wash graphic tee flat lay'
]

found_images = {}

for q in queries:
    url = f"https://www.pinterest.com/search/pins/?q={urllib.parse.quote(q)}"
    print(f"Fetching: {url}")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # Extract i.pinimg.com images
            # Pinterest pin images usually have /736x/ or /originals/ or /564x/ or /474x/
            matches = re.findall(r'https://i\.pinimg\.com/(?:736x|564x|474x|originals)/[a-zA-Z0-9/_.-]+\.(?:jpg|png|webp)', html)
            # upgrade to 736x or originals
            high_res = []
            for m in matches:
                hr = re.sub(r'/(?:564x|474x)/', '/736x/', m)
                high_res.append(hr)
            found_images[q] = list(dict.fromkeys(high_res))
            print(f"Found {len(found_images[q])} images for '{q}'")
    except Exception as e:
        print(f"Error for {q}: {e}")

print("\n--- RESULTS ---")
all_unique = []
for q, imgs in found_images.items():
    print(f"\nQuery: {q}")
    for img in imgs[:8]:
        print("  ", img)
        all_unique.append(img)

print(f"\nTotal unique Pinterest images collected: {len(set(all_unique))}")
with open('scripts/pinterest_results.json', 'w', encoding='utf-8') as f:
    json.dump(found_images, f, indent=2)
