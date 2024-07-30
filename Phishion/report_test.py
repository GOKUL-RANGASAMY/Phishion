import google.generativeai as genai

def get_report(questions):
    genai.configure(api_key="key")
    model = genai.GenerativeModel('gemini-pro')
    data= f"give me summary report in 1000 words for {questions}"
    response = model.generate_content(data)
    answer = response.text
    return answer