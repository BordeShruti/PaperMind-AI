import {
  ArrowLeft,
  FileText,
  Lightbulb,
  Search,
  Rocket,
  BookOpen,
  BarChart3,
  MessageCircle,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

import "./ResultsPage.css";

function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { analysis, filename } = location.state || {};

  // If user directly opens /results without analyzing a paper
  if (!analysis) {
    return (
      <div className="results-page">
        <header className="results-header">
          <button
            className="results-back-button"
            onClick={() => navigate("/upload")}
          >
            <ArrowLeft size={18} />
            Back to Upload
          </button>

          <div className="results-brand">
            <div className="results-brand-icon">
              <FileText size={18} />
            </div>

            <span>
              PaperMind <strong>AI</strong>
            </span>
          </div>
        </header>

        <main className="no-results">
          <FileText size={50} />

          <h1>No analysis available</h1>

          <p>
            Please upload and analyze a research paper first.
          </p>

          <button
            className="start-analysis-button"
            onClick={() => navigate("/upload")}
          >
            Upload Research Paper
          </button>
        </main>
      </div>
    );
  }

  const contributions = analysis.key_contributions || [];
  const researchGap = analysis.research_gap || [];
  const futureWork = analysis.future_work || [];
  const difficultTerms = analysis.difficult_terms || [];
  const statistics = analysis.statistics || {};

  return (
    <div className="results-page">

      {/* ================= HEADER ================= */}

      <header className="results-header">

        <button
          className="results-back-button"
          onClick={() => navigate("/upload")}
        >
          <ArrowLeft size={18} />
          Analyze Another Paper
        </button>

        <div className="results-brand">

          <div className="results-brand-icon">
            <FileText size={18} />
          </div>

          <span>
            PaperMind <strong>AI</strong>
          </span>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="results-main">

        {/* Page Heading */}

        <section className="results-heading">

          <div className="results-label">
            RESEARCH PAPER ANALYSIS
          </div>

          <h1>
            Your paper,
            <span> understood.</span>
          </h1>

          <p>
            PaperMind AI analyzed your research paper and
            extracted the most important information.
          </p>

          <div className="paper-name">
            <FileText size={18} />
            {filename || "Research Paper"}
          </div>

        </section>


        {/* ================= SUMMARY ================= */}

        <section className="result-card summary-card">

          <div className="card-title">

            <div className="card-icon purple">
              <FileText size={22} />
            </div>

            <div>
              <h2>Paper Summary</h2>
              <p>AI-generated summary</p>
            </div>

          </div>

          <div className="summary-content">
            {analysis.summary || "No summary available."}
          </div>

        </section>


        {/* ================= TWO COLUMN ================= */}

        <div className="result-grid">

          {/* KEY CONTRIBUTIONS */}

          <section className="result-card">

            <div className="card-title">

              <div className="card-icon yellow">
                <Lightbulb size={22} />
              </div>

              <div>
                <h2>Key Contributions</h2>
                <p>Important ideas identified</p>
              </div>

            </div>

            <div className="result-list">

              {contributions.length > 0 ? (
                contributions.map((item, index) => (
                  <div
                    className="result-item"
                    key={index}
                  >
                    <span>{index + 1}</span>
                    <p>{item}</p>
                  </div>
                ))
              ) : (
                <p className="empty-text">
                  No explicit contributions detected.
                </p>
              )}

            </div>

          </section>


          {/* RESEARCH GAP */}

          <section className="result-card">

            <div className="card-title">

              <div className="card-icon blue">
                <Search size={22} />
              </div>

              <div>
                <h2>Research Gap</h2>
                <p>Limitations and missing areas</p>
              </div>

            </div>

            <div className="result-list">

              {researchGap.length > 0 ? (
                researchGap.map((item, index) => (
                  <div
                    className="result-item"
                    key={index}
                  >
                    <span>{index + 1}</span>
                    <p>{item}</p>
                  </div>
                ))
              ) : (
                <p className="empty-text">
                  No research gap detected.
                </p>
              )}

            </div>

          </section>


          {/* FUTURE WORK */}

          <section className="result-card">

            <div className="card-title">

              <div className="card-icon green">
                <Rocket size={22} />
              </div>

              <div>
                <h2>Future Work</h2>
                <p>Possible future directions</p>
              </div>

            </div>

            <div className="result-list">

              {futureWork.length > 0 ? (
                futureWork.map((item, index) => (
                  <div
                    className="result-item"
                    key={index}
                  >
                    <span>{index + 1}</span>
                    <p>{item}</p>
                  </div>
                ))
              ) : (
                <p className="empty-text">
                  No future work detected.
                </p>
              )}

            </div>

          </section>


          {/* DIFFICULT TERMS */}

          <section className="result-card">

            <div className="card-title">

              <div className="card-icon orange">
                <BookOpen size={22} />
              </div>

              <div>
                <h2>Difficult Terms</h2>
                <p>Technical terms detected</p>
              </div>

            </div>

            <div className="terms-container">

              {difficultTerms.length > 0 ? (
                difficultTerms.map((term, index) => (
                  <span
                    className="term"
                    key={index}
                  >
                    {term}
                  </span>
                ))
              ) : (
                <p className="empty-text">
                  No difficult terms detected.
                </p>
              )}

            </div>

          </section>

        </div>


        {/* ================= STATISTICS ================= */}

        <section className="statistics-card">

          <div className="statistics-heading">

            <div className="card-icon pink">
              <BarChart3 size={22} />
            </div>

            <div>
              <h2>Paper Statistics</h2>
              <p>Basic information extracted from the paper</p>
            </div>

          </div>


          <div className="statistics-grid">

            <div className="stat-box">
              <strong>
                {statistics.characters || 0}
              </strong>

              <span>Characters</span>
            </div>

            <div className="stat-box">
              <strong>
                {statistics.words || 0}
              </strong>

              <span>Words</span>
            </div>

            <div className="stat-box">
              <strong>
                {statistics.sentences || 0}
              </strong>

              <span>Sentences</span>
            </div>

          </div>

        </section>


        {/* ================= CHAT CTA ================= */}

        <section className="chat-card">

          <div className="chat-icon">
            <MessageCircle size={28} />
          </div>

          <div className="chat-content">

            <h2>
              Want to ask questions about this paper?
            </h2>

            <p>
              Chat with PaperMind AI and get answers based
              on the research paper.
            </p>

          </div>

          <button
            className="chat-button"
            onClick={() => {
              alert(
                "Question Answering feature will be added next!"
              );
            }}
          >
            <MessageCircle size={18} />
            Chat with Paper
          </button>

        </section>


      </main>

    </div>
  );
}

export default ResultsPage;