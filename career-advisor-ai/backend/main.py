from fastapi import FastAPI, UploadFile, File
import json, os, csv
from datetime import datetime
from backend.resume_parser import extract_text_from_pdf, clean_text, extract_skills

app = FastAPI()
CSV_FILE = "data/processed_skills.csv"

# Skill synonym mapping
SKILL_SYNONYMS = {
    "ml": "Machine Learning",
    "js": "JavaScript",
    "py": "Python",
    "ds": "Data Science"
}

# Load career dataset
HERE = os.path.dirname(__file__)
with open(os.path.join(HERE, "career_roles.json"), "r", encoding="utf-8") as f:
    careers = json.load(f)

# Ensure CSV exists
if not os.path.exists(CSV_FILE):
    os.makedirs(os.path.dirname(CSV_FILE), exist_ok=True)
    with open(CSV_FILE, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["file_name", "extracted_skills", "timestamp"])

@app.get("/")
def home():
    return {"message": "AI Career Advisor Backend is running!"}

@app.get("/careers")
def get_careers():
    return {"careers": careers}

# ----------------- Resume Analysis with Career Scoring -----------------
@app.post("/analyze_resume/")
async def analyze_resume(file: UploadFile = File(...)):
    contents = await file.read()
    pdf_path = "temp_resume.pdf"
    with open(pdf_path, "wb") as f:
        f.write(contents)

    try:
        # Extract, clean, and normalize skills
        raw_text = extract_text_from_pdf(pdf_path)
        cleaned = clean_text(raw_text)
        skills = extract_skills(cleaned)
        normalized_skills = [SKILL_SYNONYMS.get(s.lower(), s) for s in skills]

        # Career match scoring
        career_matches = []
        for career in careers:
            # Safely handle None values in career skills
            required_skills = [s.lower() for s in career.get("skills", []) if isinstance(s, str)]
            match_count = sum(1 for skill in normalized_skills if skill and skill.lower() in required_skills)
            if match_count > 0:
                score = round((match_count / len(required_skills)) * 100, 2)
                career_matches.append({
                    "role": career["role"],
                    "description": career["description"],
                    "score": score
                })
        # Sort by score descending
        career_matches.sort(key=lambda x: x["score"], reverse=True)

        # Save to CSV
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with open(CSV_FILE, mode="a", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow([file.filename, ", ".join([str(s) for s in normalized_skills]), timestamp])
    finally:
        # Cleanup temp file
        try:
            os.remove(pdf_path)
        except OSError:
            pass

    return {
        "extracted_skills": normalized_skills,
        "career_recommendations": career_matches
    }
