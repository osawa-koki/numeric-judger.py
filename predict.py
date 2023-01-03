import numpy as np
from tensorflow import keras
import matplotlib.pyplot as plt

# モデルをロード
model = keras.models.load_model('./models/model2.h5')

def predict(filename):
    # 予測を行う画像を読み込みます
    img = plt.imread(filename)

    # 画像を28x28にリサイズします
    img = img[:, :, 0]  # 使用するのは白黒画像なので、色の次元を削除します
    img = np.resize(img, (28, 28))

    # 画像をモデルに入力するために、4次元テンソルに変換します
    img = img[np.newaxis, :, :, np.newaxis]

    # 画像を予測します
    predictions = model.predict(img)
    predicted_label = np.argmax(predictions)

    # 画像を予測します
    predictions = model.predict(img)

    # 予測結果を格納するための連想配列を作成します
    result = {}

    # 予測の確率を表示します
    for i in range(10):
        result[i] = round(predictions[0, i] * 100)

    # 予測結果を返します
    return result
