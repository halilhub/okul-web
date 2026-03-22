import urllib.request
from bs4 import BeautifulSoup
import re

query = 'Tekirdağ "Süleymanpaşa Zübeyde Hanım Mesleki ve Teknik Anadolu Lisesi" dış cephe OR bina OR okul fotoğrafı'
url = "https://html.duckduckgo.com/html/?q=" + urllib.parse.quote(query)
req_headers = {'User-Agent': 'Mozilla/5.0'}

try:
    req = urllib.request.Request(url, headers=req_headers)
    html = urllib.request.urlopen(req).read()
    soup = BeautifulSoup(html, 'html.parser')
    for a in soup.find_all('a', class_='result__snippet'):
        print(a.text)
    
except Exception as e:
    print(e)
