import urllib.request
from bs4 import BeautifulSoup
import re

url = "https://zhmtal59.meb.k12.tr/tema/okulumuz_hakkinda.php"
req_headers = {'User-Agent': 'Mozilla/5.0'}

try:
    req = urllib.request.Request(url, headers=req_headers)
    html = urllib.request.urlopen(req).read()
    soup = BeautifulSoup(html, 'html.parser')
    for img in soup.find_all('img'):
        src = img.get('src')
        if src and ('bina' in src or 'okul' in src or 'dis' in src or 'cephe' in src or '200254' in src):
            print(src)
    
except Exception as e:
    print(e)
