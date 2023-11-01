# AxiosでGETリクエストをキャッシュする

表題の技術調査を行う際に試作したデモコードです。

## 前提条件

```
$node -v
v18.13.0
```

## 実行の準備
### インストールとビルド

以下のコマンドでモジュールのインストールとビルドを行います。

```
npm install
npm run build
```

```dist/main.js```が出力されます。

### デプロイ
```index.html```と```dist/main.js```を任意のWebサーバに配置します。<br/>
または、VSCodeの拡張機能 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)をインストールし、```index.html```を開いてLive Serverを起動します。

## 実行
画面上の入力欄にURL（クエリパラメータをサポートしています）及びリクエストパラメータ（JSON形式）を入力し、各種の送信ボタンでリクエストを実行します。<br/>
```axios-cache-adapter```および```axios-extensions```を選択して利用できます。

リクエストの様子はブラウザの開発者ツールを開いて確認してください。<br/>
（キャッシュが有効な場合、ネットワークタブには当然ながら表示されませんので注意してください）

### 実行結果
|                     | 単発のリクエストを手動で繰り返す | 複数のリクエストを直列で実行する | 複数のリクエストを並列で実行する |
| ------------------- | :------------------------------: | :------------------------------: | :------------------------------: |
| axiosをそのまま使う |                                  |                                  |                                  |
| axios-cache-adapter | ◯                               | ◯                               |                                  |
| axios-extensions    | ◯                               | ◯                               | ◯                               |

## License

This project is licensed under the MIT License
