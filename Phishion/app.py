from flask import Flask, request, jsonify
from flask_cors import CORS  
import pickle
import numpy as np
from feature import FeatureExtraction
from virustotal import check_url_with_virustotal
from get_info import get_info
from certificate import get_certificate
from googlereport import report_phishing_website
import tldextract
from report_test import get_report
from mail import email
from virustotalscan import urlscan


def get_processed(url, api_key):
    info_dict = {}
    urlscan(url,api_key)
    result = get_info(url)
    print(result)
    

    if result["status_code"] == 200:
        
    

        for key, value in result.items():
                info_dict[key] = value

        domain_info = tldextract.extract(url)
        domain_name = domain_info.domain + '.' + domain_info.suffix
            # check_url_with_virustotal(api_key, url)
        virustotal_result = check_url_with_virustotal(api_key, url)
        info_dict["virustotal_result"] = virustotal_result
        

        certificate = get_certificate(url)
        info_dict["SSL_TLS_Certificate_Information"] = certificate
        info_dict["final_url"] = result["final_url"]
        obj = FeatureExtraction(result["final_url"])
        x = np.array(obj.getFeaturesList()).reshape(1,30)
        y_pred = model.predict(x)[0]
        

        if virustotal_result["status"] == "Malicious":
                info_dict["prediction"] = "Malicious"
                res=report_phishing_website(url)
                info_dict["google_report"]=res
                


        elif y_pred == 1:
                info_dict["prediction"] = "Safe website"
        else:
                info_dict["prediction"] = "Malicious"
                res=report_phishing_website(url)
                info_dict["google_report"]=res
                

        report_dict=str(info_dict)
            
    


        generate_report=get_report(report_dict)
            # print(f"{url}.pdf")
        info_dict["reporting"]=generate_report

        if "subjectAltName" in info_dict["SSL_TLS_Certificate_Information"]:
                del info_dict["SSL_TLS_Certificate_Information"]["subjectAltName"]

        return jsonify(info_dict)
        



with open('gbc_model.pkl', 'rb') as f:
    model = pickle.load(f)

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    print("web application")
    data = request.get_json() 
    print(data)
    url = data.get('url')
    print(url)
    api_key = 'api_key'

    
    if url and api_key:
        return get_processed(url, api_key)
    else:
        return jsonify({"error": "Invalid input parameters"}), 400
    
@app.route('/mail', methods=['POST'])
def mail():
    print("mail")
    data = request.get_json() 
    print(data)
    url = data.get('url')
    email_id=data.get('email')

    
    if url :
        email(url,email_id)
        return jsonify({"Mail": "Sent Sucessfully"})
    else:
        return jsonify({"Mail": "Sent Failed"})
    


def ext(url,api_key):
    result = get_info(url)
    if result["status_code"] == 200:
        info_dict = {}
        virustotal_result = check_url_with_virustotal(api_key, url)
        info_dict["virustotal_result"] = virustotal_result

        obj = FeatureExtraction(result["final_url"])
        x = np.array(obj.getFeaturesList()).reshape(1,30)
        y_pred = model.predict(x)[0]

        if virustotal_result["status"] == "Malicious":
            info_dict["prediction"] = "Malicious"
            res=report_phishing_website(url)
            info_dict["google_report"]=res
            info_dict["google_report"]="gokul"


        elif y_pred == 1:
            info_dict["prediction"] = "Safe website"
        else:
            info_dict["prediction"] = "Malicious"
        print("")
        print("")
        print("")
        print("")
        print("")
        print(info_dict) 
        print("")
        print("")
        print("")
        print("")

        return jsonify(info_dict)
    

@app.route('/extension', methods=['POST'])
def extension():
    print("extension")
    data = request.get_json() 
    print(data)
    url = data.get('url')
    api_key = 'api_key'

    if url :
        s=ext(url,api_key)
        print(s)
        return s     
 
if __name__ == '__main__':
    app.run(host="0.0.0.0",port=5000)

