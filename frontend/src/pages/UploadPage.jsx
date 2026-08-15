import { useRef, useState } from "react";
import {
  ArrowLeft,
  FileText,
  Upload,
  X,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./UploadPage.css";

function UploadPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  // -----------------------------
  // Validate PDF
  // -----------------------------
  const handleFile = (selectedFile) => {
    setError("");

    if (!selectedFile) return;

    const isPDF =
      selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf");

    if (!isPDF) {
      setError("Please upload a PDF research paper.");
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setError("File size must be less than 20 MB.");
      return;
    }

    setFile(selectedFile);
  };

  // -----------------------------
  // File input
  // -----------------------------
  const handleInputChange = (event) => {
    handleFile(event.target.files?.[0]);
  };

  // -----------------------------
  // Drag and drop
  // -----------------------------
  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    handleFile(event.dataTransfer.files?.[0]);
  };

  // -----------------------------
  // Remove file
  // -----------------------------
  const removeFile = () => {
    if (analyzing) return;

    setFile(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // -----------------------------
  // Analyze PDF
  // -----------------------------
  const analyzePaper = async () => {
    if (!file) {
      setError("Please upload a research paper first.");
      return;
    }

    if (analyzing) return;

    setError("");
    setAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://127.0.0.1:5000/api/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      // Read backend response safely
      const data = await response.json();

      console.log("=================================");
      console.log("PAPER MIND BACKEND RESPONSE");
      console.log(data);
      console.log("=================================");

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to analyze research paper."
        );
      }

      /*
       * IMPORTANT:
       * We DO NOT use data.characters.
       *
       * Your backend result is inside:
       *
       * data.analysis.statistics.characters
       *
       * Therefore we send the COMPLETE analysis object
       * to ResultsPage.
       */

      if (!data.analysis) {
        throw new Error(
          "Backend did not return analysis data."
        );
      }

      navigate("/results", {
        state: {
          analysis: data.analysis,
          filename: data.filename || file.name,
        },
      });

    } catch (err) {
      console.error("Analysis error:", err);

      if (err instanceof TypeError) {
        setError(
          "Could not connect to PaperMind AI backend. Make sure Flask is running on port 5000."
        );
      } else {
        setError(
          err.message ||
            "Something went wrong while analyzing the paper."
        );
      }
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="upload-page">

      {/* HEADER */}
      <header className="upload-header">

        <button
          className="back-button"
          onClick={() => navigate("/")}
          disabled={analyzing}
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div className="upload-brand">

          <div className="upload-brand-icon">
            <FileText size={18} />
          </div>

          <span>
            PaperMind <strong>AI</strong>
          </span>

        </div>

      </header>

      {/* MAIN */}
      <main className="upload-main">

        <div className="upload-heading">

          <div className="upload-label">
            RESEARCH PAPER ANALYZER
          </div>

          <h1>
            Upload your
            <span> research paper</span>
          </h1>

          <p>
            Upload a PDF and let PaperMind AI transform
            complex academic content into clear and useful
            insights.
          </p>

        </div>

        {/* DROP ZONE */}

        {!file ? (

          <div
            className={`drop-zone ${
              dragActive ? "drag-active" : ""
            }`}
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => {
              setDragActive(false);
            }}
            onDrop={handleDrop}
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleInputChange}
              hidden
            />

            <div className="drop-icon">
              <Upload size={28} />
            </div>

            <h2>Drop your PDF here</h2>

            <p>
              or{" "}
              <span>
                browse from your computer
              </span>
            </p>

            <div className="file-info">
              PDF only • Maximum 20 MB
            </div>

          </div>

        ) : (

          <div className="selected-file">

            <div className="file-main">

              <div className="file-icon">
                <FileText size={25} />
              </div>

              <div className="file-details">

                <h3>{file.name}</h3>

                <p>
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>

              </div>

              <div className="file-check">
                <CheckCircle2 size={22} />
              </div>

              <button
                className="remove-file"
                onClick={removeFile}
                disabled={analyzing}
                aria-label="Remove file"
              >
                <X size={18} />
              </button>

            </div>

            <button
              className={`analyze-button ${
                analyzing ? "analyzing" : ""
              }`}
              onClick={analyzePaper}
              disabled={analyzing}
            >

              {analyzing ? (
                <>
                  <Loader2
                    size={19}
                    className="loading-icon"
                  />
                  Analyzing Research Paper...
                </>
              ) : (
                <>
                  <FileText size={19} />
                  Analyze Research Paper
                </>
              )}

            </button>

          </div>

        )}

        {/* ERROR */}

        {error && (
          <div className="upload-error">
            {error}
          </div>
        )}

        {/* FEATURES */}

        <div className="analysis-info">

          <div>
            <CheckCircle2 size={17} />
            PDF text extraction
          </div>

          <div>
            <CheckCircle2 size={17} />
            AI-generated summary
          </div>

          <div>
            <CheckCircle2 size={17} />
            Research gap detection
          </div>

          <div>
            <CheckCircle2 size={17} />
            Future work suggestions
          </div>

        </div>

      </main>

    </div>
  );
}

export default UploadPage;