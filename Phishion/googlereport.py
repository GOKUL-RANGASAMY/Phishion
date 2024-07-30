import requests
import logging  


logging.basicConfig(level=logging.INFO)

def report_phishing_website(urls):
    """Reports a suspected phishing website to Google Safe Browsing.

    Args:
        url (str): The URL of the suspected phishing website.
    """

    try:
        
        url = 'https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyAbOMFndBXgaDIx3rudrlgd73yonjb07Ac'  
        headers = {'Content-Type': 'application/json'}
        payload = {
            "client": {
                "clientId": "clientId", 
                "clientVersion": "1.5.2"
            },
            "threatInfo": {
                "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING"],  
                "platformTypes": ["ANY_PLATFORM"],
                "threatEntryTypes": ["URL"],
                "threatEntries": [
                    {"url": urls}
                ]
            }
        }
        response = requests.post(url, headers=headers, json=payload)

        # Handle response
        if response.status_code == 200:
            return f"Phishing website reported successfully in Google Safe Browsing: {urls}"
        else:
            return f"Failed to report phishing website: {response.status_code}"

    except requests.exceptions.RequestException as e:
        return f"Error reporting phishing website: {e}"