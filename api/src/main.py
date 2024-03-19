from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict, Any
from difflib import SequenceMatcher
import json
from asyncio import sleep
import time

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
    allow_origins=["http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Global variable to store the last search timestamp
last_search_timestamp = 0

@app.get("/search")
async def search(word: Optional[str] = None) -> Dict[str, Any]:
    global last_search_timestamp

    if word is None:
        raise HTTPException(status_code=400, detail="Please provide a 'word' parameter.")

    current_timestamp = time.time()

    # Check if less than a second has passed since the last search
    if current_timestamp - last_search_timestamp < 1:
        # Sleep for the remaining time to make it at least one second
        await sleep(1 - (current_timestamp - last_search_timestamp))

    # Update the last search timestamp
    last_search_timestamp = time.time()

    # Get the most similar entry based on the provided word
    similar_entry = get_most_similar_entry(word, data)

    if similar_entry is None:
        raise HTTPException(status_code=404, detail="No similar entry found for the provided word.")

    return similar_entry

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
