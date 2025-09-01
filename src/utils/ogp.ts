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

  // YouTubeの場合は専用処理
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  if (isYouTube) {
    const videoId = extractYouTubeId(url);
    if (videoId) {
      return createYouTubeOGP(videoId);
    }
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
      throw new Error(`HTTP ${response.status}`);
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