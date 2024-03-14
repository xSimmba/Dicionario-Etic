from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import json

app = FastAPI()

# Load data from JSON file
with open('EDMTDictionary.json') as f:
    data = json.load(f)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/search")
async def search(word: Optional[str] = None) -> dict:
    if word is None:
        raise HTTPException(status_code=400, detail="Please provide a 'word' parameter.")

    # Filter data based on the provided word
    filtered_results = [entry for entry in data if entry["word"] and word.lower() in entry["word"].lower()]

    # If no results found, return empty list
    if not filtered_results:
        return []

    # If results found, return the first result (assuming only one match is expected)
    return filtered_results[0]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
