from urllib.parse import urlparse
import ssl
import socket



def get_certificate(url):
    try:
        parsed_url = urlparse(url)
        hostname = parsed_url.hostname
        port = parsed_url.port or 443  # Default SSL/TLS port

        context = ssl.create_default_context()
        with socket.create_connection((hostname, port)) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert = ssock.getpeercert()
                return cert
    except (socket.gaierror, socket.timeout, ssl.SSLError) as e:
        print(f"Error: {e}")
        return None
    


def print_certificate_info(cert):
    if cert is not None:
        for key, value in cert.items():
            print(f"{key}: {value}")