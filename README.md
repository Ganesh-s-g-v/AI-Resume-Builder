# AI Resume & Portfolio Builder 🚀

A web application that leverages the power of Google's Gemini AI to help users generate professional, well-styled resumes from their personal information. This tool features a real-time preview, a full-screen view, and a 'Download as PDF' option.


## ✨ Features

* **AI-Powered Content Generation:** Uses the Google Gemini API to create well-worded resume sections.
* **Professional Styling:** Formats the resume into a clean, modern style inspired by professional templates.
* **Full-Screen Preview:** A maximize button allows for an immersive, full-page view of the generated resume.
* **Download as PDF:** Easily export the final resume as a high-quality PDF document.
* **Simple and Intuitive UI:** A clean, two-panel layout for easy data entry and previewing.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript
* **Backend:** Python, Flask
* **AI:** Google Gemini API
* **PDF Generation:** jsPDF, html2canvas

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You will need the following installed on your computer:
* [Git](https://git-scm.com/)
* [Python 3.8+](https://www.python.org/downloads/)
* A Google Gemini API Key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Ganesh-s-g-v/AI-Resume-Builder.git](https://github.com/Ganesh-s-g-v/AI-Resume-Builder.git)
    ```

2.  **Navigate into the project directory:**
    ```bash
    cd AI-Resume-Builder
    ```

3.  **Install the required Python packages:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up your environment variables:**
    * Create a file named `.env` in the main project folder.
    * Inside the `.env` file, add the following line, replacing the placeholder with your own Google Gemini API key:
        ```
        GEMINI_API_KEY="YOUR_API_KEY_GOES_HERE"
        ```

### Running the Application

1.  **Start the Flask server:**
    ```bash
    python app.py
    ```

2.  Open your web browser and go to: `http://127.0.0.1:5000`

---

## 📝 Usage

1.  Fill in the form on the left with your personal details, education, experience, and skills.
2.  Click the **"Generate Resume"** button.
3.  Preview the generated resume in the panel on the right.
4.  Use the maximize button (`❐`) for a full-screen view.
5.  Once you're satisfied, click the **"Download as PDF"** button to save a copy.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 👤 Contact

Siddi Ganesh Vardhan - siddiganeshvardhan@gmail.com

Project Link: [https://github.com/Ganesh-s-g-v/AI-Resume-Builder](https://github.com/Ganesh-s-g-v/AI-Resume-Builder)
