# coding=UTF-8
import asyncio
import re
import time
import aiohttp
import async_timeout
from bs4 import BeautifulSoup
from flask_cors import cross_origin
from flask import Flask, jsonify, request

app = Flask(__name__)


async def fetch(session, url):
    async with async_timeout.timeout(10):
        async with session.get(url, headers={'Accept-Encoding': 'gzip, deflate'}) as response:
            return await response.text()


async def fetch_music_info(session, url):
    html = await fetch(session, url)
    pre_url = url
    soup = BeautifulSoup(html, 'html.parser')
    m = re.findall("url: '(.*?)',", str(soup))
    if not m:
        return None
    urlc = m[0]
    if 'get_music' in urlc:
        urlc = f"https://www.hifini.com/{urlc}"
        url = urlc
    else:
        url = urlc
    pic = re.findall("pic: '(.*?)'", str(soup))[0]
    title = re.findall("title: '(.*?)',", str(soup))[0]
    author = re.findall("author:'(.*?)',", str(soup))[0]
    te = str(soup).replace('\r', '').replace('\n', '').replace('\t', '')
    res11 = re.findall('<p>(.*?)</p>', te)
    res12 = list(filter(None, res11))
    res13 = list(filter(lambda x: '<' not in x, res12))
    res14 = list(filter(lambda x: '+' not in x, res13))
    res15 = [string.strip() for string in res14]
    lrc = res15
    return {'url': url, 'pre_url': pre_url, 'pic': pic, 'title': title, 'author': author, 'lrc': lrc}


async def get_music(keyword, page):
    start = time.time()
    relist = []
    async with aiohttp.ClientSession() as session:
        url = f'https://www.hifini.com/search-{str(keyword)}-1-{str(page)}.htm'
        html = await fetch(session, url)
        soup = BeautifulSoup(html, 'html.parser')
        a_tags = soup.find_all('a')
        tasks = []
        for a in a_tags:
            if keyword in a.text:
                url = f'https://www.hifini.com/{a["href"]}'
                task = asyncio.create_task(fetch_music_info(session, url))
                tasks.append(task)
        results = await asyncio.gather(*tasks)
        for result in results:
            if result:
                relist.append(result)
    end = time.time()
    print(f'时间差: {end - start}')
    return relist


async def fast_music_info(url):
    async with aiohttp.ClientSession() as session:
        html = await fetch(session, url)
        pre_url = url
        soup = BeautifulSoup(html, 'html.parser')
        m = re.findall("url: '(.*?)',", str(soup))
        if not m:
            return None
        urlc = m[0]
        if 'get_music' in urlc:
            urlc = f"https://www.hifini.com/{urlc}"
            url = urlc
        else:
            url = urlc
        pic = re.findall("pic: '(.*?)'", str(soup))[0]
        title = re.findall("title: '(.*?)',", str(soup))[0]
        author = re.findall("author:'(.*?)',", str(soup))[0]
        te = str(soup).replace('\r', '').replace('\n', '').replace('\t', '')
        res11 = re.findall('<p>(.*?)</p>', te)
        res12 = list(filter(None, res11))
        res13 = list(filter(lambda x: '<' not in x, res12))
        res14 = list(filter(lambda x: '+' not in x, res13))
        res15 = [string.strip() for string in res14]
        lrc = res15
        return {'url': url, 'pre_url': pre_url, 'pic': pic, 'title': title, 'author': author, 'lrc': lrc}


@app.route('/search/<keyword>/')
@cross_origin()
def search(keyword):
    page = request.args.get('page')
    music_list = loop.run_until_complete(get_music(keyword, page))
    return jsonify(music_list)


@app.route('/fast_search/<path:url>')
@cross_origin()
def fast_search(url):
    info = loop.run_until_complete(fast_music_info(url))
    return jsonify(info)


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    app.run(port=13874, host="0.0.0.0", debug=True)
