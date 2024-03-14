from fastapi import FastAPI
import json

app = FastAPI()

with open('EDMTDictionary.json') as f:
    data = json.load(f)

@app.get("/search/")
def get_data():
    print(data)
    return data
