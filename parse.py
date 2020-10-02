from bs4 import BeautifulSoup
import requests
import json

url = "https://mydramalist.com/shows/popular"
page =  requests.get(url)
soup = BeautifulSoup(page.content, 'lxml')
items = []
for item in soup.find("div", {"class": "b-primary"}).findAll("div", {"class": "box"}):
    box = {
        "img_src": item.find('img')['src'],
        "name": item.find('h6').text,
        "short_decp": item.find("span", {"class": "text-muted"}).text,
        "score": item.find("span", {"class": "score"}).text
    }
    items.append(box)
results = {
    "value": items
}
print(results)
# show results in json
json_object = json.dumps(results, indent = 4) 
with open("results.json", "w") as outfile: 
    outfile.write(json_object) 
