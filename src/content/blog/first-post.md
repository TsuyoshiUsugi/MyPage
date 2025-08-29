---
title: "ポートフォリオサイトを作成しました"
description: "AstroとGitHub Pagesを使ってポートフォリオサイトを作成した際の技術選定や実装のポイントについて紹介します。"
pubDate: 2025-08-25
priority: 1
tags: ["Astro", "GitHub Pages", "ポートフォリオ", "AI生成"]
---

## はじめに

このたび、Astroを使ってポートフォリオサイトを作成しました。技術ブログや作品紹介、音楽プレイリストなどを掲載する個人サイトとして構築しています。

## 技術選定

### Astro を選んだ理由

1. **静的サイト生成**: パフォーマンスとSEOに有利
2. **コンポーネントベース**: 再利用可能な設計が可能
3. **Markdownサポート**: ブログ記事の管理が簡単
4. **TypeScript対応**: 型安全な開発が可能

### GitHub Pages でのホスティング

- 無料で利用可能
- GitHub Actionsとの連携が簡単
- 独自ドメインの設定も可能（AdSense対応のため）

## 実装のポイント

### ダークテーマのデザイン

```css
:root {
  --bg-primary: #0f1115;
  --text-primary: #e6e6e6;
  --text-secondary: #9aa0a6;
  --accent: #8ab4f8;
  --border: #2d3748;
}
```

Noto Sans JPフォントを使用し、読みやすさを重視した配色にしました。

### YouTube プレイリスト連携

GitHub Actionsを使って30分ごとにYouTube Data APIからプレイリスト情報を取得し、`playlist.json`として保存する仕組みを実装しました。

### モバイル対応

レスポンシブデザインを採用し、モバイル端末でも快適に閲覧できるよう調整しました。

## 今後の予定

- Unity WebGLゲームの追加
- 技術記事の充実
- パフォーマンス最適化
- AdSenseの導入

引き続き、コンテンツの充実とサイトの改善を進めていきます。