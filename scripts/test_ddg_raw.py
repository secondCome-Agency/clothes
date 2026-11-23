import urllib.request, urllib.parse, json, re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

query = "aesthetic streetwear t-shirt flat lay pinterest"
token_url = f"https://duckduckgo.com/?q={urllib.parse.quote(query)}&iax=images&ia=images"
req = urllib.request.Request(token_url, headers=headers)
with urllib.request.urlopen(req, timeout=10) as resp:
    html = resp.read().decode('utf-8')
    m = re.search(r'vqd=([\d-]+)', html)
    print("VQD:", m.group(1) if m else "None")
    if m:
        vqd = m.group(1)
        api_url = f"https://duckduckgo.com/i.js?l=us-en&o=json&q={urllib.parse.quote(query)}&vqd={vqd}&f=,,,&p=1"
        req2 = urllib.request.Request(api_url, headers=headers)
        with urllib.request.urlopen(req2, timeout=10) as resp2:
            data = json.loads(resp2.read().decode('utf-8'))
            results = data.get('results', [])
            print(f"Results count: {len(results)}")
            for r in results[:10]:
                print("Title:", r.get('title'))
                print("Image:", r.get('image'))
                print("URL:", r.get('url'))
                print("---")
