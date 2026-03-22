import urllib.request
from bs4 import BeautifulSoup

url = "https://zhmtal59.meb.k12.tr/"
req_headers = {'User-Agent': 'Mozilla/5.0'}

try:
    req = urllib.request.Request(url, headers=req_headers)
    html = urllib.request.urlopen(req).read()
    soup = BeautifulSoup(html, 'html.parser')
    for img in soup.find_all('img'):
        src = img.get('src')
        if src and 'resimler' in src:
            print(src)
    
except Exception as e:
    print(e)
