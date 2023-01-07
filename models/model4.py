import tensorflow as tf
import numpy as np

# MNISTデータセットをロードします
mnist = tf.keras.datasets.mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()

# 画像データを正規化する
x_train = x_train / 255.0
x_test = x_test / 255.0

# ラベルをone-hotエンコーディングする
y_train = np.eye(10)[y_train]
y_test = np.eye(10)[y_test]

# モデルを構築する
model = tf.keras.Sequential()
model.add(tf.keras.layers.Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)))
model.add(tf.keras.layers.MaxPooling2D(pool_size=(2, 2)))
model.add(tf.keras.layers.Conv2D(64, kernel_size=(3, 3), activation='relu'))
model.add(tf.keras.layers.MaxPooling2D(pool_size=(2, 2)))
model.add(tf.keras.layers.Flatten())
model.add(tf.keras.layers.Dense(128, activation='relu'))
model.add(tf.keras.layers.Dense(10, activation='softmax'))

# モデルをコンパイルする
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# モデルを学習させる
model.fit(x_train, y_train, epochs=10, batch_size=64)

# モデルをテストする
loss, accuracy = model.evaluate(x_test, y_test)
print('loss:', loss)
print('accuracy:', accuracy)
