from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict, Any
from difflib import SequenceMatcher
import json

app = FastAPI()

def get_similarity_ratio(text: str, test_case: str) -> float:
    """
    Get the similarity ratio between two strings
    """
    return SequenceMatcher(None, text.lower(), test_case.lower()).ratio()

def get_most_similar_entry(word: str, data: List[Dict[str, Any]], threshold: float = 0.5) -> Optional[Dict[str, Any]]:
    """
    Return the entry from the data list that corresponds to the most similar word
    """
    match_entry = None
    similarity = 0

    for entry in data:
        entry_word = entry["word"]
        similarity_ratio = get_similarity_ratio(word, entry_word)

        if similarity_ratio == 1:
            return entry

        if similarity_ratio > similarity:
            match_entry = entry
            similarity = similarity_ratio

    if similarity < threshold:
        return None

    return match_entry

# Load data from JSON file
with open('EDMTDictionary.json') as f:
    data = json.load(f)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://localhost:8001"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/search")
async def search(word: Optional[str] = None) -> Dict[str, Any]:
    if word is None:
        raise HTTPException(status_code=400, detail="Please provide a 'word' parameter.")

    # Get the most similar entry based on the provided word
    similar_entry = get_most_similar_entry(word, data)

    if similar_entry is None:
        raise HTTPException(status_code=404, detail="No similar entry found for the provided word.")

    return similar_entry

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
