import subprocess
import re
import json

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

queries = {
    "tshirt": "aesthetic streetwear t shirt flat lay clothing product",
    "pants": "aesthetic streetwear cargo pants wide leg flat lay product",
    "lower": "aesthetic streetwear sweatpants track pants lower flat lay",
    "hoodie": "aesthetic heavyweight oversized hoodie flat lay streetwear product"
}

results = {}

for category, q in queries.items():
    url = f"https://www.pinterest.com/search/pins/?q={q.replace(' ', '%20')}"
    print(f"\n--- Fetching {category}: {url} ---")
    try:
        cmd = [
            CHROME_PATH,
            "--headless=new",
            "--disable-gpu",
            "--virtual-time-budget=8000",
            "--dump-dom",
            url
        ]
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=25, encoding='utf-8', errors='ignore')
        html = proc.stdout
        print(f"Rendered HTML length: {len(html)}")
        
        # Find all i.pinimg.com images
        imgs = re.findall(r'https://i\.pinimg\.com/(?:originals|736x|564x|474x|236x)/[a-zA-Z0-9/_.-]+\.(?:jpg|png|webp)', html)
        # filter out avatars / icons / generic ui
        valid = []
        for img in imgs:
            if '75x75' in img or 'avatar' in img or 'favicon' in img or 'd53b014d' in img:
                continue
            # upgrade resolution to 736x
            high_res = re.sub(r'/(?:564x|474x|236x)/', '/736x/', img)
            valid.append(high_res)
        valid = list(dict.fromkeys(valid))
        print(f"Extracted {len(valid)} images for {category}")
        for v in valid[:6]:
            print("  ", v)
        results[category] = valid
    except Exception as e:
        print(f"Error for {category}: {e}")

with open('scripts/pinterest_scraped.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)

print("\nDone! Saved to scripts/pinterest_scraped.json")
