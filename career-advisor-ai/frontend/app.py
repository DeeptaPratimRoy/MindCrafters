import streamlit as st
import requests
import pandas as pd

# ----------------- Page Setup -----------------
st.set_page_config(page_title="AI Career Advisor", layout="wide")
st.title("🧑‍🎓 AI Career Advisor")
st.write("Upload your resume and get skill extraction + top career recommendations!")

# ----------------- Initialize Variables -----------------
extracted_skills = []
career_recommendations = []

# ----------------- Resume Upload -----------------
uploaded_file = st.file_uploader("Upload your PDF resume", type=["pdf"])
if uploaded_file is not None:
    st.info(f"Uploaded: {uploaded_file.name}")

    with st.spinner("Analyzing resume..."):
        try:
            files = {"file": (uploaded_file.name, uploaded_file, "application/pdf")}
            response = requests.post("http://127.0.0.1:8000/analyze_resume/", files=files)

            if response.status_code == 200:
                data = response.json()
                extracted_skills = data.get("extracted_skills", [])
                career_recommendations = data.get("career_recommendations", [])

                if extracted_skills:
                    st.success("✅ Skills extracted successfully!")
                    st.subheader("Extracted Skills")
                    st.write(", ".join(extracted_skills))
                else:
                    st.warning("⚠️ No skills found in the resume.")
            else:
                st.error(f"Backend error: {response.status_code}")

        except requests.exceptions.RequestException:
            st.error("⚠️ Could not connect to backend. Make sure FastAPI is running.")

# ----------------- Display Career Recommendations -----------------
if career_recommendations:
    st.subheader("🏆 Top Career Recommendations (Based on Skill Match)")
    
    # Show top 5 careers with match scores
    for career in career_recommendations[:5]:
        st.markdown(f"**{career['role']}** - {career['description']} (Match: {career['score']}%)")

    # ----------------- Download CSV -----------------
    df = pd.DataFrame(career_recommendations)
    df["skills_extracted"] = ", ".join(extracted_skills)
    csv_data = df.to_csv(index=False)
    st.download_button(
        label="📥 Download Recommendations CSV",
        data=csv_data,
        file_name="career_recommendations.csv",
        mime="text/csv"
    )

    # ----------------- Skill Coverage Visualization -----------------
    st.subheader("Skill Match Visualization")
    chart_data = pd.DataFrame({
        "Career": [c['role'] for c in career_recommendations[:5]],
        "Match (%)": [c['score'] for c in career_recommendations[:5]]
    })
    st.bar_chart(chart_data.set_index("Career"))
