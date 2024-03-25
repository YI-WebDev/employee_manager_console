FROM node:16

# ディレクトリを/appに設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# npm installを実行
RUN npm install

# プロジェクトファイルをコピー
COPY . .

# ビルドを実行
RUN npm run build

# ポート3000を公開
EXPOSE 3000

# serveコマンドを実行してビルドされたファイルを提供
CMD ["npx", "serve", "-s", "build", "-l", "3000"]