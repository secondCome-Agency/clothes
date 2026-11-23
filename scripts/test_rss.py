import urllib.request, re, xml.etree.ElementTree as ET

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

# Test public board RSS feeds
boards = [
    'https://www.pinterest.com/streetwearaesthetic/streetwear-outfits.rss',
    'https://www.pinterest.com/aestheticclothing/clothes.rss',
    'https://www.pinterest.com/outfitgrid/streetwear.rss',
    'https://www.pinterest.com/streetwearinspo/outfit-flat-lays.rss',
]

for b in boards:
    try:
        req = urllib.request.Request(b, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            print(f"Board {b} returned {len(content)} bytes")
            # find i.pinimg.com
            imgs = re.findall(r'https://i\.pinimg\.com/(?:originals|736x|564x|474x)/[a-zA-Z0-9/_.-]+\.(?:jpg|png|webp)', content)
            print("Found images:", len(imgs))
            for img in imgs[:5]:
                print("  ", img)
    except Exception as e:
        print(f"Error {b}: {e}")
