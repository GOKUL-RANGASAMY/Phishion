import tldextract
import socket
import whois
import requests
from urllib.parse import urljoin
from bs4 import BeautifulSoup




def get_info(url):
    domain_info = tldextract.extract(url)
    domain_name = domain_info.domain + '.' + domain_info.suffix

    try:
        ip_address = socket.gethostbyname(domain_name)
    except socket.gaierror:
        ip_address = "N/A"

    final_url, status_code, redirect_count = get_final_redirect_url(url)

    try:
        domain_info = whois.whois(domain_name)
        registry_domain_id = domain_info.registry_domain_id
        registrar_url = domain_info.registrar
    except whois.parser.PywhoisError:
        registry_domain_id = "N/A"
        registrar_url = "N/A"

    link_count = count_links_in_page(url)
    image_count = count_images_in_page(url)
    images_in_links_count = count_images_in_links(url)

    return {
        "domain_name": domain_name,
        "registry_domain_id": registry_domain_id,
        " registrar_url": registrar_url,
        "ip_address": ip_address,
        "status_code": status_code,
        "final_url": final_url,
        "redirect_count": redirect_count,
        "link_count": link_count,
        "image_count": image_count,
        "images_in_links_count": images_in_links_count,
    }





def count_links_in_page(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        links = soup.find_all('a', href=True)
        link_array = [link['href'] for link in links]
        return link_array

    except requests.exceptions.RequestException:
        return "Error: Unable to connect"
    

def count_images_in_page(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        images = soup.find_all('img')
        return len(images)
    except requests.exceptions.RequestException:
        return "Error: Unable to connect"

def count_images_in_links(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        a_tags = soup.find_all('a', href=True)
        image_count = 0
        for a_tag in a_tags:
            if a_tag.find('img'):
                image_count += 1
        return image_count
    except requests.exceptions.RequestException:
        return "Error: Unable to connect"

def get_final_redirect_url(url):
    redirect_count = 0
    max_redirects = 5

    while redirect_count < max_redirects:
        try:
            response = requests.get(url, allow_redirects=False)
            status_code = response.status_code
            if status_code == 301 or 302:
                redirect_count += 1
                location = response.headers.get('Location')
                if location:
                    url = urljoin(url, location)
                else:
                    break
            else:
                break
        except requests.exceptions.RequestException:
            status_code = "Error: Unable to connect"
            url = "N/A"
            break

    return url, status_code, redirect_count





# try:
    #     response = requests.get(url)
    #     soup = BeautifulSoup(response.text, 'html.parser')
    #     links = soup.find_all('a', href=True)
    #     link_array = [link['href'] for link in links]
    #     return link_array
    # except requests.exceptions.RequestException:
    #     return ["Error: Unable to connect"]