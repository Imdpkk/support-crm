import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.0-flash")

response = model.generate_content(
    "Say hello in one sentence."
)

print(response.text)