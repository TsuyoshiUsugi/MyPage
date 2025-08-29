# Unity WebGL Game ページの作成方法

Unity WebGLゲームの詳細ページを作成する方法を説明します。

## ファイル構成

```
public/works/[game-name]/
├── Build/           # Unity WebGL ビルドファイル
├── StreamingAssets/ # ストリーミングアセット（必要に応じて）
└── TemplateData/    # テンプレートデータ

src/pages/works/[game-name].astro  # ゲーム詳細ページ
```

## 1. Unity WebGL ビルドの配置

1. Unity でプロジェクトをビルド（WebGL、Decompression Fallback を有効化）
2. ビルドされたファイルを `public/works/[game-name]/` にアップロード
3. `index.html` は使用せず、Astroページで独自のレイアウトを使用

## 2. Astro ページファイルの作成

`src/pages/works/[game-name].astro` を作成します：

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import GameEmbed from '../../components/GameEmbed.astro';
---

<BaseLayout 
  title="[ゲーム名] - モルモ's Tech? ブログ"
  description="[ゲームの説明]"
>
  <div class="game-page">
    <header class="game-header">
      <h1>[ゲーム名]</h1>
      <p class="game-description">[ゲームの説明文]</p>
    </header>

    <!-- ゲーム埋め込み -->
    <GameEmbed 
      gamePath="/works/[game-name]"
      gameTitle="[ゲーム名]"
      width={800}
      height={600}
    />

    <!-- ゲーム詳細情報 -->
    <section class="game-details">
      <h2>ゲーム詳細</h2>
      
      <div class="details-grid">
        <div class="detail-item">
          <h3>開発期間</h3>
          <p>[開発期間]</p>
        </div>
        
        <div class="detail-item">
          <h3>使用技術</h3>
          <ul>
            <li>Unity [バージョン]</li>
            <li>C#</li>
            <li>[その他使用技術]</li>
          </ul>
        </div>
        
        <div class="detail-item">
          <h3>操作方法</h3>
          <ul>
            <li>[操作方法の説明]</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 開発について -->
    <section class="development-notes">
      <h2>開発について</h2>
      <p>[開発時に工夫した点、学んだことなど]</p>
    </section>

    <div class="back-link">
      <a href="/works">← 作品一覧に戻る</a>
    </div>
  </div>
</BaseLayout>

<style>
  .game-page {
    max-width: 1000px;
    margin: 0 auto;
  }

  .game-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .game-header h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--accent);
  }

  .game-description {
    font-size: 1.125rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .game-details {
    margin: 3rem 0;
    padding: 2rem;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.02);
  }

  .game-details h2 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .detail-item h3 {
    color: var(--accent);
    margin-bottom: 0.5rem;
    font-size: 1.125rem;
  }

  .detail-item ul {
    list-style: none;
    padding-left: 1rem;
  }

  .detail-item li::before {
    content: "•";
    color: var(--accent);
    margin-right: 0.5rem;
  }

  .development-notes {
    margin: 3rem 0;
    padding: 2rem;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.02);
  }

  .development-notes h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .development-notes p {
    line-height: 1.6;
    color: var(--text-secondary);
  }

  .back-link {
    margin-top: 3rem;
    text-align: center;
  }

  .back-link a {
    color: var(--accent);
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border: 1px solid var(--accent);
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .back-link a:hover {
    background: var(--accent);
    color: var(--bg-primary);
  }

  @media (max-width: 768px) {
    .game-header h1 {
      font-size: 2rem;
    }
    
    .details-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

## 3. GameEmbedコンポーネントについて

`GameEmbed` コンポーネントは既に実装済みで、以下の props を受け取ります：

- `gamePath`: ゲームファイルへのパス (`/works/[game-name]`)
- `gameTitle`: ゲームタイトル
- `width`: ゲーム表示幅（デフォルト: 800px）
- `height`: ゲーム表示高さ（デフォルト: 600px）

## 4. 注意事項

- Unity ビルド設定で「Decompression Fallback」を有効にしてください
- ゲームが重い場合はローディング画面が表示されます
- モバイル対応が必要な場合は、タッチ操作に対応してください
- ファイルサイズが大きい場合は、最適化を検討してください

## 5. プロフィール画像・favicon について

### プロフィール画像
- **ファイル名**: `profile-icon.png`
- **配置場所**: `public/assets/profile-icon.png`
- **推奨サイズ**: 200x200px 以上、正方形
- **形式**: PNG、JPG

### favicon
- **ファイル名**: `favicon.png`
- **配置場所**: `public/favicon.png`  
- **推奨サイズ**: 32x32px または 16x16px
- **形式**: PNG、ICO