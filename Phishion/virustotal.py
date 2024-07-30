import requests

def check_url_with_virustotal(api_key, url):
    url_scan_api = 'https://www.virustotal.com/vtapi/v2/url/report'

    params = {
        'apikey': api_key,
        'resource': url
    }

    try:
        response = requests.get(url_scan_api, params=params)
        result = response.json()

        if result['response_code'] == 1:
            if result['positives'] > 0:
                detected_scanners = [
                    {"vendor": scanner, "result": info['result']} 
                    for scanner, info in result['scans'].items() 
                    if info.get('detected') and info.get('result') == 'phishing site'
                ]

                total_scanners = len(result['scans'])
                detection_percentage = (len(detected_scanners) / total_scanners) * 100

                return {
                    "status": "Malicious",
                    "detected_scanners": detected_scanners,
                    "positives": result['positives'],
                    "detection_percentage": detection_percentage
                }
            else:
                return {"status": "Clean"}
        else:
            return {"status": "No Results"}
    except requests.RequestException as e:
        return {"status": "Error", "error_message": str(e)}
