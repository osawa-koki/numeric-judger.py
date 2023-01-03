from fastapi import FastAPI, File, HTTPException
from datetime import datetime

app = FastAPI()

@app.post("/api/numeric-judge")
def receive_image(image: bytes = File(...)):
    # 現在の日時を取得
    now = datetime.now()
    # 日時をフォーマットする
    filename = now.strftime("%Y%m%d%H%M%S")
    # 画像を保存する
    with open(filename, "wb") as f:
        f.write(image)
    return {"received": True}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
