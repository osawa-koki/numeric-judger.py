from fastapi import FastAPI, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import uuid

app = FastAPI()

# CORSを許可する
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/numeric-judge")
def receive_image(image: bytes = File(...)):
    # GUIDを生成する
    guid = uuid.uuid4()
    # GUIDを小文字に変換する
    guid = guid.hex.lower()

    # 画像を保存する
    with open(f"{guid}.png", "wb") as f:
        f.write(image)
    return {"received": True}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=80)
