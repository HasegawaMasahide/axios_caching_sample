# AxiosでGETリクエストをキャッシュする

表題の技術調査を行う際に試作したデモコードです。

## Requirement

```
$node -v
v18.13.0
```

## Installing and building

以下のコマンドでモジュールのインストールとビルドを行います。

```
npm install
npx run build
```

```dist/main.js```が出力されます。

## Deployment
```index.html```と```dist/main.js```を任意のWebサーバに配置します。

または、VSCodeの拡張機能 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)をインストールし、```index.html```を開いてLive Serverを起動します。

## Running
画面上の入力欄にURL（クエリパラメータをサポートしています）及びリクエストパラメータ（JSON形式）を入力し、各種の送信ボタンでリクエストを実行します。
```axios-cache-adapter```および```axios-extensions```を選択して利用できます。
リクエストの様子はブラウザの開発者ツールを開いて確認してください。（キャッシュが有効な場合、ネットワークタブには当然ながら表示されませんので注意してください）

## License

This project is licensed under the MIT License
