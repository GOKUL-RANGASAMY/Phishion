import requests

def urlscan(url,api_key):

    payload = { "url": url }
    headers = {
        "accept": "application/json",
        "x-apikey": api_key,
        "content-type": "application/x-www-form-urlencoded"
    }

    response = requests.post(url, data=payload, headers=headers)

    print(response.text)