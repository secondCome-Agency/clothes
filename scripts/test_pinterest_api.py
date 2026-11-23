import urllib.request
import urllib.parse
import json
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

# 1. Test Pinterest API /resource/BaseSearchResource/get/
def search_pinterest_api(query):
    options = {
        "options": {
            "query": query,
            "scope": "pins",
            "page_size": 25
        },
        "context": {}
    }
    encoded = urllib.parse.quote(json.dumps(options))
    url = f"https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=/search/pins/?q={urllib.parse.quote(query)}&data={encoded}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            results = []
            pins = data.get('resource_response', {}).get('data', {}).get('results', [])
            for p in pins:
                images = p.get('images', {})
                # get highest res
                orig = images.get('orig', {}).get('url') or images.get('736x', {}).get('url')
                if orig:
                    results.append(orig)
            return results
    except Exception as e:
        print(f"Pinterest API failed: {e}")
        return []

# 2. Test DuckDuckGo image search for site:pinterest.com
def search_ddg_images(query):
    # ddg html search or image token search
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote('site:pinterest.com ' + query)}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            matches = re.findall(r'https?://(?:i\.)?pinimg\.com/(?:736x|originals|564x)/[a-zA-Z0-9/_.-]+\.(?:jpg|jpeg|png|webp)', html)
            return list(dict.fromkeys(matches))
    except Exception as e:
        print(f"DDG search failed: {e}")
        return []

print("Trying Pinterest API...")
p_res = search_pinterest_api("streetwear t-shirt flat lay")
print(f"Pinterest API returned {len(p_res)} images:")
for u in p_res[:5]:
    print(" ", u)

print("\nTrying DDG search...")
ddg_res = search_ddg_images("streetwear aesthetic clothes flat lay t-shirt pants")
print(f"DDG returned {len(ddg_res)} images:")
for u in ddg_res[:5]:
    print(" ", u)
