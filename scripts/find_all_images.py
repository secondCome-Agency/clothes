import os, re

img_urls = {}
for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.jsx', '.js', '.json', '.css')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                matches = re.findall(r'https?://[^\s"\'`)]+', content)
                matches = [m for m in matches if any(ext in m for ext in ['.jpg', '.jpeg', '.png', '.webp', 'unsplash.com', 'pinimg.com', 'cdn.21st.dev'])]
                if matches:
                    img_urls[path] = list(dict.fromkeys(matches))

for p, urls in sorted(img_urls.items()):
    print(f'=== {p} ({len(urls)} images) ===')
    for u in urls:
        print('  ', u)
