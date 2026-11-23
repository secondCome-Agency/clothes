import urllib.request, urllib.parse, re, json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
}

queries = [
    "aesthetic streetwear t-shirt flat lay site:pinterest.com",
    "aesthetic cargo pants clothes flat lay site:pinterest.com",
    "streetwear parachute pants sweatpants flat lay site:pinterest.com",
    "aesthetic oversized hoodie clothes flat lay site:pinterest.com",
    "streetwear clothes flat lay no model site:pinterest.com"
]

all_pinimg = []

for q in queries:
    url = f"https://images.search.yahoo.com/search/images?p={urllib.parse.quote(q)}"
    print(f"Fetching: {url}")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # Extract i.pinimg.com image links
            # Yahoo images has imgurl in data or JSON: "iurl":"https:\/\/i.pinimg.com\/..."
            matches = re.findall(r'https?(?:%3A%2F%2F|://)(?:i\.)?pinimg\.com(?:%2F|/)(?:originals|736x|564x|474x)(?:%2F|/)[a-zA-Z0-9/_.-]+\.(?:jpg|png|webp)', html)
            # also unescape if urlencoded
            cleaned = []
            for m in matches:
                u = urllib.parse.unquote(m)
                # upgrade to 736x
                u = re.sub(r'/(?:564x|474x)/', '/736x/', u)
                cleaned.append(u)
            cleaned = list(dict.fromkeys(cleaned))
            print(f"Found {len(cleaned)} pinimg images for '{q}'")
            for c in cleaned[:6]:
                print("  ", c)
            all_pinimg.extend(cleaned)
    except Exception as e:
        print(f"Error {q}: {e}")

all_pinimg = list(dict.fromkeys(all_pinimg))
print(f"\nTotal unique Pinterest images collected: {len(all_pinimg)}")
with open('scripts/yahoo_pinimg_results.json', 'w', encoding='utf-8') as f:
    json.dump(all_pinimg, f, indent=2)
