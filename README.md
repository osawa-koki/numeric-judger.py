# numeric-judger

手書き文字を認識するプログラム。  
シーケンシャルモデルの学習用に。  

![成果物](./.development/img/fruit.gif)  

## 実行方法

```shell
docker build -t numeric-judger . && docker run -it --rm -p 80:80 --name my-numeric-judger numeric-judger
```

## 補足

「Google Colab」の「ランタイム」 -> 「ランタイムのタイプを変更」からGPUを選択できる。  
