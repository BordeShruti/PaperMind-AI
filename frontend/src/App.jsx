import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  FileSearch,
  FileText,
  Lightbulb,
  MessageCircle,
  Sparkles,
  Upload,
} from "lucide-react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import UploadPage from "./pages/UploadPage";
import ResultsPage from "./pages/ResultsPage";
import "./App.css";

function HomePage() {
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="brand">
            <div className="brand-icon">
              <Brain size={22} />
            </div>
            <span>PaperMind</span>
            <span className="brand-ai">AI</span>
          </div>

          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#about">About</a>
          </div>

          <a href="/upload" className="nav-button">
  Get Started
  <ArrowRight size={16} />
</a>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <section className="hero">
          <div className="hero-glow glow-one"></div>
          <div className="hero-glow glow-two"></div>

          <div className="hero-content">
            <div className="badge">
              <Sparkles size={15} />
              AI-powered research assistant
            </div>

            <h1>
              Understand research papers
              <span> in minutes.</span>
            </h1>

            <p className="hero-description">
              Upload a research paper and let PaperMind AI extract the key
              ideas, contributions, research gaps, future directions, and
              difficult concepts for you.
            </p>

            <div className="hero-actions">
              <a href="/upload" className="primary-button">
  <Upload size={19} />
  Upload Research Paper
  <ArrowRight size={17} />
</a>
              <a href="#features" className="secondary-button">
  <BookOpen size={18} />
  Explore Features
</a>
            </div>

            <div className="trust-row">
              <div>
                <CheckCircle2 size={17} />
                Student-friendly
              </div>
              <div>
                <CheckCircle2 size={17} />
                AI-powered
              </div>
              <div>
                <CheckCircle2 size={17} />
                Easy to understand
              </div>
            </div>
          </div>

          {/* Paper Preview */}
          <div className="paper-preview">
            <div className="preview-header">
              <div className="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="preview-title">
                <FileText size={15} />
                Research Analysis
              </div>
            </div>

            <div className="preview-body">
              <div className="preview-paper-title">
                Explainable AI for Sustainable Decision Making
              </div>

              <div className="preview-author">
                Research Paper • 2026
              </div>

              <div className="analysis-section">
                <div className="analysis-icon purple">
                  <FileSearch size={17} />
                </div>
                <div>
                  <h4>Summary</h4>
                  <p>
                    This paper proposes an explainable AI framework that
                    improves transparency in intelligent decision-making...
                  </p>
                </div>
              </div>

              <div className="analysis-section">
                <div className="analysis-icon blue">
                  <Lightbulb size={17} />
                </div>
                <div>
                  <h4>Research Gap</h4>
                  <p>
                    Existing approaches provide limited interpretability and
                    lack integration with real-world decision systems...
                  </p>
                </div>
              </div>

              <div className="analysis-section">
                <div className="analysis-icon green">
                  <Sparkles size={17} />
                </div>
                <div>
                  <h4>Key Contribution</h4>
                  <p>
                    A unified framework combining explainability,
                    recommendations, and intelligent analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features" id="features">
          <div className="section-heading">
            <div className="section-label">POWERFUL ANALYSIS</div>
            <h2>Everything you need to understand a paper</h2>
            <p>
              Stop spending hours trying to understand complicated research
              papers. PaperMind turns dense academic content into clear,
              actionable insights.
            </p>
          </div>

          <div className="feature-grid">
            <FeatureCard
              icon={<FileText />}
              title="Smart Summary"
              description="Get a concise explanation of the paper without reading every page."
              color="purple"
            />

            <FeatureCard
              icon={<Lightbulb />}
              title="Key Contributions"
              description="Identify the most important ideas, methods, and innovations."
              color="yellow"
            />

            <FeatureCard
              icon={<FileSearch />}
              title="Research Gap"
              description="Discover limitations and unexplored areas that future research can address."
              color="blue"
            />

            <FeatureCard
              icon={<Sparkles />}
              title="Future Work"
              description="Understand possible improvements and future research directions."
              color="green"
            />

            <FeatureCard
              icon={<BookOpen />}
              title="Difficult Terms"
              description="Get simple explanations for technical words and concepts."
              color="orange"
            />

            <FeatureCard
              icon={<MessageCircle />}
              title="Chat with Paper"
              description="Ask questions about the paper and get answers based on its content."
              color="pink"
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="how-section" id="how-it-works">
          <div className="section-heading">
            <div className="section-label">SIMPLE WORKFLOW</div>
            <h2>From paper to understanding</h2>
            <p>
              Three simple steps to turn a complex research paper into
              meaningful insights.
            </p>
          </div>

          <div className="steps">
            <Step
              number="01"
              icon={<Upload />}
              title="Upload"
              description="Upload your research paper in PDF format."
            />

            <div className="step-line"></div>

            <Step
              number="02"
              icon={<Brain />}
              title="Analyze"
              description="Our AI reads and analyzes the research paper."
            />

            <div className="step-line"></div>

            <Step
              number="03"
              icon={<Lightbulb />}
              title="Understand"
              description="Get summaries, gaps, insights and explanations."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section" id="about">
          <div className="cta-content">
            <div className="cta-icon">
              <Brain size={30} />
            </div>

            <h2>Ready to understand your next paper?</h2>

            <p>
              Turn hours of reading into minutes of intelligent analysis.
            </p>

            <a href="/upload" className="primary-button">
  <Upload size={19} />
  Analyze a Research Paper
  <ArrowRight size={17} />
</a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="brand">
            <div className="brand-icon">
              <Brain size={19} />
            </div>
            <span>PaperMind</span>
            <span className="brand-ai">AI</span>
          </div>

          <p>
            AI-powered research paper assistant for students and researchers.
          </p>

          <span className="copyright">
            © 2026 PaperMind AI. Built for learning and research.
          </span>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }) {
  return (
    <div className="feature-card">
      <div className={`feature-icon ${color}`}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <ArrowRight className="feature-arrow" size={18} />
    </div>
  );
}

function Step({ number, icon, title, description }) {
  return (
    <div className="step">
      <div className="step-number">{number}</div>
      <div className="step-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/upload"
          element={<UploadPage />}
        />

        <Route
          path="/results"
          element={<ResultsPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;