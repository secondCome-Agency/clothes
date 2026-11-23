import urllib.request, urllib.parse, re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

# Search Google for Pinterest pins
def find_pins(query):
    url = f"https://www.google.com/search?q={urllib.parse.quote('site:pinterest.com/pin/ ' + query)}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            pins = re.findall(r'https://(?:www\.)?pinterest\.com/pin/\d+/?', html)
            return list(dict.fromkeys(pins))
    except Exception as e:
        print("Google search error:", e)
        return []

print("Searching pins...")
pins = find_pins("streetwear aesthetic t-shirt flat lay clothes")
print(f"Found {len(pins)} pin URLs:")
for p in pins[:8]:
    print(" ", p)

# If we have a pin URL, fetch og:image
for p in pins[:3]:
    try:
        req = urllib.request.Request(p, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            og_img = re.search(r'<meta\s+property=["\']og:image["\']\s+content=["\'](https://i\.pinimg\.com/[^"\']+)["\']', content)
            if og_img:
                print(f"Pin: {p} -> Image: {og_img.group(1)}")
            else:
                # also try itemprop="image" or any i.pinimg.com image
                pinimg = re.findall(r'https://i\.pinimg\.com/(?:736x|originals)/[a-zA-Z0-9/_.-]+\.(?:jpg|png|webp)', content)
                print(f"Pin: {p} -> Found {len(pinimg)} pinimg: {pinimg[:2]}")
    except Exception as e:
        print(f"Error fetching {p}: {e}")
