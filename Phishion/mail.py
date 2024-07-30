import pandas as pd
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def email(url,email_id):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login('from mail', 'app password')


    email = "to mail"
    content = f"You are request to verify this url [{url}] whether this website is phishing or not"
    status = "Yet to Send"
    subject = f"Phishing detection verification in {url}" 
        
    if status == 'Yet to Send':
            msg = MIMEMultipart()
            msg['From'] = 'from mail'
            msg['To'] = email
            msg['Subject'] = subject 
            
            msg.attach(MIMEText(content, 'plain'))

            try:
                server.sendmail('kumarbharani206@gmail.com', email, msg.as_string())
                return 
                print('Sent')
            except Exception as e:
                print(f"Failed to send email to {email}. Error: {e}")
                



    server.quit()