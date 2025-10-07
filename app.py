import os
from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
from dotenv import load_dotenv

# Load variables from the .env file into the environment
load_dotenv() 

app = Flask(__name__, static_folder='static', template_folder='.')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_resume():
    try:
        # Get the API key securely from the environment variables
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            return jsonify({'error': 'API key is not configured.'}), 500

        data = request.get_json()
        user_info = data.get('userInfo')
        if not user_info:
            return jsonify({'error': 'User information is missing.'}), 400

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-flash')

        prompt = f"""
        Based on the following information, generate a professional resume using clean, semantic HTML.
        - The main container should be a div with the class "resume-body".
        - The name should be an <h2> tag.
        - Contact info should be in a <p> tag with class "contact-info".
        - Section titles (like Objective, Skills, etc.) should be <h3> tags.
        - Each entry under Experience, Projects, or Education should be a <div class="entry">.
        - Inside each entry, the title and date line should be a <div class="entry-header">.
          - Inside the header, the title should be a <span class="title"> and the date a <span class="date">.
        - Description points should be an unordered list (<ul> with <li> items).
        - Do not include <html>, <head>, or <body> tags. Only generate the content for the resume body.

        **User Information:**
        - Name: {user_info.get('name', 'N/A')}
        - Email: {user_info.get('email', 'N/A')}
        - Phone: {user_info.get('phone', 'N/A')}
        - LinkedIn: {user_info.get('linkedin', 'N/A')}
        - Education: {user_info.get('education', 'N/A')}
        - Experience: {user_info.get('experience', 'N/A')}
        - Projects: {user_info.get('projects', 'N/A')}
        - Skills: {user_info.get('skills', 'N/A')}
        """
        response = model.generate_content(prompt)
        # Clean up the response to remove markdown backticks if they exist
        cleaned_html = response.text.replace('```html', '').replace('```', '').strip()
        return jsonify({'resume': cleaned_html})

    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)