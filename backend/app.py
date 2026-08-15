from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz
import os
import uuid

from services.paper_analyzer import analyze_paper as analyze_document

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {"pdf"}


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )


def extract_pdf_text(pdf_path):
    document = fitz.open(pdf_path)

    pages = []

    for page in document:
        text = page.get_text()
        pages.append(text)

    document.close()

    return "\n".join(pages).strip()


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "success",
        "message": "PaperMind AI backend is running"
    })


@app.route("/api/analyze", methods=["POST"])
def analyze_paper():

    if "file" not in request.files:
        return jsonify({
            "status": "error",
            "message": "No PDF file was provided"
        }), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({
            "status": "error",
            "message": "No file selected"
        }), 400

    if not allowed_file(file.filename):
        return jsonify({
            "status": "error",
            "message": "Only PDF files are supported"
        }), 400

    unique_name = f"{uuid.uuid4()}.pdf"
    file_path = os.path.join(UPLOAD_FOLDER, unique_name)

    file.save(file_path)

    try:
        extracted_text = extract_pdf_text(file_path)

        if not extracted_text:
            return jsonify({
                "status": "error",
                "message": "Could not extract text from this PDF"
            }), 400

        # Analyze extracted paper text
        analysis = analyze_document(extracted_text)

        return jsonify({
            "status": "success",
            "message": "Paper analyzed successfully",
            "filename": file.filename,
            "analysis": analysis
        })

    except Exception as error:

        return jsonify({
            "status": "error",
            "message": str(error)
        }), 500

    finally:

        if os.path.exists(file_path):
            os.remove(file_path)


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )