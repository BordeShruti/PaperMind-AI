import re
from collections import Counter


# =========================================================
# TEXT CLEANING
# =========================================================

def clean_text(text):
    """Clean extracted PDF text."""

    # Remove excessive whitespace
    text = re.sub(r"\s+", " ", text)

    # Remove common PDF artifacts
    text = re.sub(r"-\s+", "", text)

    return text.strip()


# =========================================================
# SENTENCE SPLITTING
# =========================================================

def get_sentences(text):
    """Split text into readable sentences."""

    sentences = re.split(
        r"(?<=[.!?])\s+",
        text
    )

    return [
        sentence.strip()
        for sentence in sentences
        if len(sentence.strip()) > 30
    ]


# =========================================================
# TEXT SUMMARIZATION
# =========================================================

def generate_summary(text, max_sentences=6):
    """
    Generate an extractive NLP summary.

    Important sentences are selected using
    keyword and word-frequency scoring.
    """

    sentences = get_sentences(text)

    if not sentences:
        return "No readable text was found in the research paper."

    important_keywords = [
        "objective",
        "aim",
        "purpose",
        "propose",
        "proposed",
        "present",
        "introduce",
        "method",
        "methodology",
        "approach",
        "framework",
        "model",
        "algorithm",
        "experiment",
        "results",
        "findings",
        "conclusion",
    ]

    # -----------------------------------------------------
    # Word frequency
    # -----------------------------------------------------

    words = re.findall(
        r"\b[a-zA-Z]{4,}\b",
        text.lower()
    )

    stop_words = {
        "this",
        "that",
        "these",
        "those",
        "with",
        "from",
        "which",
        "using",
        "have",
        "been",
        "were",
        "their",
        "there",
        "about",
        "into",
        "also",
        "such",
        "than",
        "then",
        "they",
        "them",
        "more",
        "other",
    }

    word_frequency = Counter(
        word
        for word in words
        if word not in stop_words
    )

    scored_sentences = []

    for index, sentence in enumerate(sentences):

        score = 0
        lower_sentence = sentence.lower()

        # Keyword score
        for keyword in important_keywords:

            if keyword in lower_sentence:
                score += 3

        # Word-frequency score
        sentence_words = re.findall(
            r"\b[a-zA-Z]{4,}\b",
            lower_sentence
        )

        for word in sentence_words:
            score += word_frequency.get(word, 0) * 0.05

        # Give slightly higher importance to early sentences
        if index < 8:
            score += 1

        scored_sentences.append(
            (score, index, sentence)
        )

    scored_sentences.sort(
        key=lambda item: (-item[0], item[1])
    )

    selected = sorted(
        scored_sentences[:max_sentences],
        key=lambda item: item[1]
    )

    return " ".join(
        sentence
        for _, _, sentence in selected
    )


# =========================================================
# KEY CONTRIBUTIONS
# =========================================================

def extract_contributions(text):
    """Extract sentences describing research contributions."""

    sentences = get_sentences(text)

    keywords = [
        "we propose",
        "we present",
        "we introduce",
        "our contribution",
        "contributions",
        "novel",
        "developed",
        "develop",
        "proposed",
        "framework",
        "algorithm",
        "model",
        "method",
        "approach",
    ]

    results = []

    for sentence in sentences:

        lower = sentence.lower()

        if any(
            keyword in lower
            for keyword in keywords
        ):
            results.append(sentence)

    return results[:5]


# =========================================================
# RESEARCH GAP
# =========================================================

def identify_research_gap(text):
    """Detect possible research gaps and limitations."""

    sentences = get_sentences(text)

    keywords = [
        "however",
        "limitation",
        "limitations",
        "challenge",
        "challenges",
        "lack of",
        "research gap",
        "gap",
        "future research",
        "remains unclear",
        "few studies",
        "little research",
        "not addressed",
        "insufficient",
        "drawback",
        "shortcoming",
        "weakness",
        "problem",
        "unable to",
    ]

    results = []

    for sentence in sentences:

        lower = sentence.lower()

        if any(
            keyword in lower
            for keyword in keywords
        ):
            results.append(sentence)

    if not results:

        return [
            "No explicit research gap was detected from the available text."
        ]

    return results[:5]


# =========================================================
# FUTURE WORK
# =========================================================

def identify_future_work(text):
    """Extract future research directions."""

    sentences = get_sentences(text)

    keywords = [
        "future work",
        "future research",
        "future studies",
        "in future",
        "further research",
        "future direction",
        "should be explored",
        "could be extended",
        "could be improved",
        "will be investigated",
        "next step",
        "next steps",
        "future development",
    ]

    results = []

    for sentence in sentences:

        lower = sentence.lower()

        if any(
            keyword in lower
            for keyword in keywords
        ):
            results.append(sentence)

    if not results:

        return [
            "No explicit future-work section was detected automatically."
        ]

    return results[:5]


# =========================================================
# DIFFICULT / TECHNICAL TERMS
# =========================================================

def extract_difficult_terms(text):
    """
    Identify technical terms and abbreviations.
    """

    terms = set()

    # -----------------------------------------------------
    # Uppercase abbreviations
    # -----------------------------------------------------

    uppercase_matches = re.findall(
        r"\b[A-Z][A-Z0-9-]{1,}\b",
        text
    )

    for term in uppercase_matches:

        if len(term) >= 2:
            terms.add(term)

    # -----------------------------------------------------
    # Common technical terms
    # -----------------------------------------------------

    technical_keywords = [
        "machine learning",
        "deep learning",
        "artificial intelligence",
        "natural language processing",
        "neural network",
        "convolutional neural network",
        "recurrent neural network",
        "transformer",
        "attention mechanism",
        "large language model",
        "embedding",
        "classification",
        "regression",
        "clustering",
        "tokenization",
        "sentiment analysis",
        "text summarization",
        "information extraction",
        "knowledge graph",
        "explainable artificial intelligence",
    ]

    lower_text = text.lower()

    for term in technical_keywords:

        if term in lower_text:
            terms.add(term)

    return sorted(
        terms,
        key=lambda term: len(term),
        reverse=True
    )[:20]


# =========================================================
# STATISTICS
# =========================================================

def calculate_statistics(text):
    """Calculate basic NLP text statistics."""

    sentences = get_sentences(text)

    words = re.findall(
        r"\b\w+\b",
        text
    )

    paragraphs = [
        paragraph.strip()
        for paragraph in text.split("\n")
        if paragraph.strip()
    ]

    return {
        "characters": len(text),
        "words": len(words),
        "sentences": len(sentences),
        "paragraphs": len(paragraphs),
    }


# =========================================================
# MAIN ANALYZER
# =========================================================

def analyze_paper(text):
    """
    Main PaperMind NLP analysis pipeline.
    """

    cleaned = clean_text(text)

    if not cleaned:
        return {
            "summary": "No readable text was found.",
            "key_contributions": [],
            "research_gap": [],
            "future_work": [],
            "difficult_terms": [],
            "statistics": {
                "characters": 0,
                "words": 0,
                "sentences": 0,
                "paragraphs": 0,
            },
        }

    return {

        # NLP APPLICATION 1
        "summary": generate_summary(cleaned),

        # NLP APPLICATION 2
        "key_contributions": extract_contributions(
            cleaned
        ),

        # NLP APPLICATION 3
        "research_gap": identify_research_gap(
            cleaned
        ),

        # NLP APPLICATION 4
        "future_work": identify_future_work(
            cleaned
        ),

        # NLP APPLICATION 5
        "difficult_terms": extract_difficult_terms(
            cleaned
        ),

        # TEXT STATISTICS
        "statistics": calculate_statistics(
            cleaned
        ),
    }