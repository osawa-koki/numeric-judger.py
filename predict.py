import numpy as np
from tensorflow import keras
import matplotlib.pyplot as plt
import cv2

# モデルをロード
model = keras.models.load_model('./models/model5.h5')

def predict(filename):
    image = cv2.imread(filename)

    image = 255 - image

    image = image[:, :, 0].astype('uint8') # 0番目のチャンネルだけ取り出して，白黒画像にする
    image = cv2.resize(image, dsize=(28, 28))
    image = image.astype('float32')
    image /= 255
    image = image.reshape(1, 28, 28, 1)

    # 画像を予測します
    predictions = model.predict(image)[0]
    predicted_label = np.argmax(predictions)

    # 予測結果を格納するための連想配列を作成します
    result = {}

    # 予測の確率を表示します
    for i in range(10):
        result[i] = round(predictions[i] * 100)

    # 予測結果を返します
    return result
