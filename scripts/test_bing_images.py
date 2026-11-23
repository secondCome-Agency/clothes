import urllib.request, urllib.parse, re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

queries = [
    "aesthetic streetwear clothes flat lay site:pinterest.com",
    "streetwear t shirt flat lay aesthetic i.pinimg.com",
    "streetwear pants cargo flat lay i.pinimg.com"
]

for q in queries:
    url = f"https://www.bing.com/images/search?q={urllib.parse.quote(q)}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # Extract image URLs
            # Bing image results have murl&quot;:&quot;https:...
            murls = re.findall(r'murl&quot;:&quot;(https?://[^&]+)&quot;', html)
            print(f"Query: {q} -> {len(murls)} images found")
            for m in murls[:8]:
                print("  ", m)
    except Exception as e:
        print(f"Error {q}: {e}")
