import urllib.request
import urllib.parse
import json
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://duckduckgo.com/',
}

def get_pinterest_images_via_ddg(query, count=10):
    try:
        # Step 1: get vqd token
        token_url = f"https://duckduckgo.com/?q={urllib.parse.quote(query)}&iax=images&ia=images"
        req = urllib.request.Request(token_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8')
            m = re.search(r'vqd=([\d-]+)', html)
            if not m:
                print("Could not find vqd token")
                return []
            vqd = m.group(1)

        # Step 2: call i.js
        api_url = f"https://duckduckgo.com/i.js?l=us-en&o=json&q={urllib.parse.quote(query)}&vqd={vqd}&f=,,,&p=1"
        req2 = urllib.request.Request(api_url, headers=headers)
        with urllib.request.urlopen(req2, timeout=10) as resp2:
            data = json.loads(resp2.read().decode('utf-8'))
            results = []
            for r in data.get('results', []):
                img_url = r.get('image', '')
                if 'pinimg.com' in img_url or 'pinterest.com' in r.get('url', ''):
                    results.append(img_url)
            return results[:count]
    except Exception as e:
        print(f"Error for {query}: {e}")
        return []

queries = [
    "site:pinterest.com aesthetic streetwear t-shirt flat lay",
    "site:pinterest.com aesthetic cargo pants streetwear flat lay",
    "site:pinterest.com aesthetic parachute pants lower streetwear",
    "site:pinterest.com aesthetic heavyweight hoodie streetwear flat lay",
]

for q in queries:
    print(f"\nQuery: {q}")
    imgs = get_pinterest_images_via_ddg(q, 8)
    print(f"Found {len(imgs)} images:")
    for u in imgs:
        print(" ", u)
