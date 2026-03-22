import urllib.request
from bs4 import BeautifulSoup
import json

urls = [
    "https://zhmtal59.meb.k12.tr/icerikler/18-mart-%C3%A7anakkale-zaferi-ve-%C5%9Fehitleri-anma-g%C3%BCn%C3%BC_17288244.html",
    "https://zhmtal59.meb.k12.tr/icerikler/2025-2026-e%C4%9Fitim-%C3%B6%C4%9Fretim-y%C4%B1l%C4%B1-2-d%C3%B6nem-1-ortak-s%C4%B1nav-takvimi_17259844.html",
    "https://zhmtal59.meb.k12.tr/icerikler/okulumuzda-1-7-mart-deprem-haftas%C4%B1-deprem-tatbikat%C4%B1-yap%C4%B1ld%C4%B1_17233443.html"
]

req_headers = {'User-Agent': 'Mozilla/5.0'}
results = []

for url in urls:
    try:
        req = urllib.request.Request(url, headers=req_headers)
        html = urllib.request.urlopen(req).read()
        soup = BeautifulSoup(html, 'html.parser')
        
        # Try finding the main content area in MEB templates
        # Usually it's an article tag or class icerik
        title = soup.find('h1')
        title_text = title.text.strip() if title else ""
        
        paragraphs = soup.find_all('p')
        content_text = "\n".join([p.text.strip() for p in paragraphs if p.text.strip()])
        
        imgs = []
        for img in soup.find_all('img'):
            src = img.get('src')
            if src and 'meb_iys_dosyalar' in src:
                if not src.startswith('http'):
                    src = 'https://zhmtal59.meb.k12.tr' + src
                imgs.append(src)
        
        results.append({
            'url': url,
            'title': title_text,
            'content': content_text[:500] + '...', # Preview
            'images': imgs
        })
    except Exception as e:
        results.append({'url': url, 'error': str(e)})

print(json.dumps(results, indent=2, ensure_ascii=False))
