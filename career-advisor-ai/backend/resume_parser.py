# backend/resume_parser.py
import PyPDF2
import re
import os

# Simple skills DB (expand as needed)
SKILLS_DB = [
    "Python", "Java", "C++", "SQL", "HTML", "CSS", "JavaScript",
    "React", "Node.js", "Machine Learning", "Deep Learning",
    "Data Structures", "Algorithms", "Git", "Linux", "Networking",
    "Communication", "Leadership", "Problem Solving", "Tableau", "Pandas", "NumPy"
]

def extract_text_from_pdf(pdf_path):
    """Extract raw text from a PDF file safely."""
    text = ""
    if not os.path.exists(pdf_path):
        return text
    try:
        with open(pdf_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for i, page in enumerate(reader.pages):
                try:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + " "
                except Exception as e:
                    print(f"⚠️ Warning: Could not read page {i}: {e}")
    except Exception as e:
        print(f"❌ Error opening PDF: {e}")
    return text

def clean_text(text):
    """Basic cleaning: remove emails, multiple spaces, trim."""
    text = re.sub(r'\S+@\S+', ' ', text)          # remove emails
    text = re.sub(r'http\S+', ' ', text)          # remove urls
    text = re.sub(r'[^A-Za-z0-9\s\.\-]+', ' ', text)  # allow letters, numbers, space, dot, dash
    text = re.sub(r'\s+', ' ', text)              # collapse whitespace
    return text.strip().lower()

def extract_skills(text):
    """Find skills by simple substring matching (case-insensitive)."""
    text_low = text.lower()
    found = []
    for skill in SKILLS_DB:
        if skill.lower() in text_low:
            found.append(skill)
    # return unique sorted skills
    return sorted(list(set(found)))
