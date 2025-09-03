export interface OGPData {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
}

const ALLOWED_DOMAINS = [
  'youtube.com',
  'youtu.be',
  'github.com',
  'twitter.com',
  'x.com',
  'zenn.dev',
  'qiita.com',
  'note.com',
  'hatenablog.com',
  'medium.com',
  'dev.to',
  'stackoverflow.com',
  'docs.microsoft.com',
  'developer.mozilla.org',
  'unity.com',
  'photonengine.com',
  'redhologerbera.hatenablog.com'
];

function isAllowedURL(url: string): boolean {
  try {
    const urlObject = new URL(url);
    const hostname = urlObject.hostname.toLowerCase();
    
    // HTTPSのみ許可
    if (urlObject.protocol !== 'https:') {
      return false;
    }
    
    // 許可されたドメインかチェック
    return ALLOWED_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}

// YouTube動画ID抽出関数
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

// YouTube専用のOGPデータ生成
function createYouTubeOGP(videoId: string): OGPData {
  return {
    title: 'YouTube動画',
    description: 'YouTube動画です',
    image: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    siteName: 'YouTube'
  };
}

export async function fetchOGP(url: string): Promise<OGPData> {
  // URL検証
  if (!isAllowedURL(url)) {
    console.warn(`URL not allowed: ${url}`);
    return {};
  }

  // YouTubeの場合は実際のOGP取得を試行
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  if (isYouTube) {
    try {
      // youtu.beを標準URLに変換
      const standardUrl = url.includes('youtu.be') 
        ? url.replace('youtu.be/', 'www.youtube.com/watch?v=')
        : url;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const response = await fetch(standardUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const html = await response.text();
        
        // YouTubeの特殊なメタタグパターンも考慮
        const titleMatch = html.match(/<meta property="og:title" content="([^"]*)"[^>]*>/) 
          || html.match(/<meta name="twitter:title" content="([^"]*)"[^>]*>/)
          || html.match(/<title>([^<]*)<\/title>/)
          || html.match(/"title":"([^"]*)"/)
          || html.match(/ytInitialData.*?"title":{"runs":\[{"text":"([^"]*)"/);
        
        const descriptionMatch = html.match(/<meta property="og:description" content="([^"]*)"[^>]*>/)
          || html.match(/<meta name="twitter:description" content="([^"]*)"[^>]*>/)
          || html.match(/<meta name="description" content="([^"]*)"[^>]*>/)
          || html.match(/"shortDescription":"([^"]*)"/);
        
        const imageMatch = html.match(/<meta property="og:image" content="([^"]*)"[^>]*>/)
          || html.match(/<meta name="twitter:image" content="([^"]*)"[^>]*>/);
        
        if (titleMatch) {
          const title = titleMatch[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
          const description = descriptionMatch ? descriptionMatch[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>') : undefined;
          
          return {
            title: title,
            description: description,
            image: imageMatch ? imageMatch[1] : undefined,
            siteName: 'YouTube'
          };
        }
      }
    } catch (error) {
      console.warn('YouTube OGP fetch failed:', error);
    }
    
    // フォールバック: 動画IDから基本情報を生成
    const videoId = extractYouTubeId(url);
    if (videoId) {
      return createYouTubeOGP(videoId);
    }
    
    console.warn('Could not extract YouTube video ID from URL:', url);
    return {};
  }

  try {
    // 10秒のタイムアウト設定
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OGPBot/1.0)'
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.warn(`HTTP ${response.status} for URL: ${url}`);
      return {};
    }
    
    const html = await response.text();
    
    const titleMatch = html.match(/<meta property="og:title" content="([^"]*)"[^>]*>/) 
      || html.match(/<meta name="twitter:title" content="([^"]*)"[^>]*>/)
      || html.match(/<title>([^<]*)<\/title>/);
    
    const descriptionMatch = html.match(/<meta property="og:description" content="([^"]*)"[^>]*>/)
      || html.match(/<meta name="twitter:description" content="([^"]*)"[^>]*>/)
      || html.match(/<meta name="description" content="([^"]*)"[^>]*>/);
    
    const imageMatch = html.match(/<meta property="og:image" content="([^"]*)"[^>]*>/)
      || html.match(/<meta name="twitter:image" content="([^"]*)"[^>]*>/);
    
    const siteNameMatch = html.match(/<meta property="og:site_name" content="([^"]*)"[^>]*>/);
    
    return {
      title: titleMatch ? titleMatch[1] : undefined,
      description: descriptionMatch ? descriptionMatch[1] : undefined,
      image: imageMatch ? imageMatch[1] : undefined,
      siteName: siteNameMatch ? siteNameMatch[1] : undefined,
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn(`OGP fetch timeout for URL: ${url}`);
    } else {
      console.error('Failed to fetch OGP data:', error);
    }
    return {};
  }
}