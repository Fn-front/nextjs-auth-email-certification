# nextjs-auth-email-certification

## 仕様

本来next-authはメールキャッシュをDBに保存して実装するが<br />
今回はモックなのでブラウザキャッシュを使用している（サービス実装時は絶対使わないように気をつけること）<br />
対象ファイル：<br />
lib/nextAuth/memoryCache<br />
lib/nextAuth/memoryAdaptor

## Gmail SMTPサーバーの設定手順

Gmailアカウントでアプリパスワードを生成

2段階認証が有効な状態で、Googleアカウントの「セキュリティ」設定から「アプリパスワード」を生成します。<br />
生成方法:<br />

1. Googleアカウントにログイン。<br />
2. 「セキュリティ」タブに移動。<br />
3. 「アプリパスワード」オプションを見つけて、ログインし直します。<br />
4. 「メール」と「お使いのデバイス」を選択して生成。<br />
5. 生成されたアプリパスワードをコピー。<br />

## envに以下の情報が必要

### Gmail SMTP 設定

EMAIL_SERVER_HOST=smtp.gmail.com<br />
EMAIL_SERVER_PORT=465<br />
EMAIL_SERVER_USER=your-email@gmail.com<br />
EMAIL_SERVER_PASSWORD=your-app-password<br />

### 送信元メールアドレス

EMAIL_FROM=your-email@gmail.com<br />
