## 📄 PaperMind AI

🧠 AI-Powered Research Paper Analysis System

PaperMind AI is an NLP-based research paper analysis platform that allows users to upload research papers in PDF format and automatically analyze their content.

The system extracts text from research papers and provides useful insights such as summaries, key contributions, research gaps, limitations, and other important information through an easy-to-use web interface.

## 🚀 Live Demo

🌐 Try PaperMind AI:

👉 https://paper-mind-ai-red.vercel.app/

Note: The frontend is deployed on Vercel. For complete analysis functionality, the Flask backend must also be deployed and properly connected to the frontend.


## 🖥️ Project Preview

### 📊 Dashboard Page

![Dashboard Page](<./PREVIEW%20PICS/DASHBOARD%20PAGE.png>)

### 📤 Upload Page

![Upload Page](<./PREVIEW%20PICS/UPLOAD%20PAGE.png>)

### 📄 Result Page

![Result Page](<./PREVIEW%20PICS/RESULT%20PAGE.png>)

## 📁 Project Structure

```text
PaperMind-AI/
│
├── backend/
│   ├── services/
│   │   └── paper_analyzer.py
│   │
│   ├── utils/
│   │
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── pages/
│   │   │   ├── ResultsPage.css
│   │   │   ├── ResultsPage.jsx
│   │   │   ├── UploadPage.css
│   │   │   └── UploadPage.jsx
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── screenshots/
│   ├── upload-page.png
│   └── results-page.png
│
├── .gitignore
└── README.md
```

## 💻 Requirements

Before running PaperMind AI, Check your versions:

python --version

node --version

npm --version

git --version

## 🐍 Backend Setup

Open a terminal and run:
```text
cd backend
```
Create a Python virtual environment:
```
python -m venv venv
```
In Windows

Activate the environment:
```
venv\Scripts\activate
```
In Linux / macOS
```
source venv/bin/activate
```
Install the required Python packages:
```
pip install -r requirements.txt
```
Start the Flask server:
```
python app.py
```
The backend will run at:

http://127.0.0.1:5000

## ⚛️ Frontend Setup

Open a new terminal while keeping the Flask server running.

Move to the frontend:
```
cd frontend
```
Install React dependencies:
```
npm install
```
Start the Vite development server:
```
npm run dev
```
The frontend will normally be available at:

http://localhost:5173

Open this address in your browser.

## 🔬 Research Paper Analysis

PaperMind AI can provide structured information such as:

📝 Summary-
A concise overview of the research paper.

💡 Key Contributions-
Important contributions and findings presented by the researchers.

🔎 Research Gaps-
Potential areas where further research may be required.

⚠️ Limitations-
Important limitations or constraints discussed or identified from the paper.

## 📊 Project Workflow

## 🔄 Project Workflow

![PaperMind AI Project Workflow](./PREVIEW%20PICS/FLOWCHART.png)

---

### 👩‍💻 Made with ❤️ by **SHRUTI BORDE**

---

