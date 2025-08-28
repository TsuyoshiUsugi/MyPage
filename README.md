# TsuyoshiUsugi Portfolio

Astroで構築されたポートフォリオサイトです。技術ブログ、作品紹介、音楽プレイリストなどを掲載しています。

## 🚀 技術スタック

- **Astro** - 静的サイトジェネレーター
- **TypeScript** - 型安全な開発
- **GitHub Pages** - ホスティング
- **GitHub Actions** - CI/CD & 自動化

## 📁 プロジェクト構成

```
/
├── src/
│   ├── pages/           # ページコンポーネント
│   │   ├── blog/        # ブログ関連ページ
│   │   └── works/       # 作品紹介ページ
│   ├── layouts/         # レイアウトコンポーネント
│   ├── components/      # 再利用可能コンポーネント
│   └── content/         # Markdownコンテンツ
│       └── blog/        # ブログ記事
├── public/              # 静的ファイル
│   ├── assets/         # 画像などのアセット
│   ├── works/          # Unity WebGLビルド
│   └── data/           # 動的データ（プレイリスト等）
├── .github/
│   └── workflows/      # GitHub Actions
└── docs/               # 仕様書・ドキュメント
```

## 🛠️ 開発

### 必要な環境

- Node.js 18+
- npm

### セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### ビルド

```bash
# プロダクション用ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## 📝 ブログ記事の追加

1. `src/content/blog/` に新しい `.md` ファイルを作成
2. 以下のフロントマターを追加：

```yaml
---
title: "記事タイトル"
description: "記事の説明"
pubDate: 2024-08-28
tags: ["tag1", "tag2"]
---
```

## 🎮 Unity WebGL作品の追加

1. Unity WebGLビルドを `public/works/[作品名]/` に配置
2. `src/pages/works/[作品名].astro` に詳細ページを作成
3. `GameEmbed` コンポーネントを使用してゲームを埋め込み

## 🎵 YouTube プレイリスト連携

### 設定方法

1. YouTube Data API v3のAPIキーを取得
2. GitHub SecretsでAPIキーとプレイリストIDを設定：
   - `YOUTUBE_API_KEY`: YouTube Data API v3のAPIキー
   - `YOUTUBE_PLAYLIST_ID`: 表示したいプレイリストのID

### 自動更新

- GitHub Actionsにより30分ごとにプレイリストデータを更新
- 更新されたデータは `public/data/playlist.json` に保存

## 🚀 デプロイ

### GitHub Pages

1. リポジトリの Settings > Pages でソースを「GitHub Actions」に設定
2. `master` ブランチにプッシュすると自動デプロイが実行

### 独自ドメイン設定（AdSense用）

1. `public/CNAME` ファイルにドメインを記載
2. DNS設定でGitHub PagesのIPアドレスを指定

## 📊 パフォーマンス

- Lighthouse モバイルスコア 80+ を目標
- 画像の遅延読み込み実装
- OGP対応済み

## 🔧 主要コンポーネント

- **BaseLayout**: 共通レイアウト（ヘッダー・フッター）
- **PostCard**: ブログ記事カード
- **NowPlaylist**: YouTube プレイリスト表示
- **GameEmbed**: Unity WebGL ゲーム埋め込み

## 📄 ライセンス

このプロジェクトはMITライセンスのもとで公開されています。