export interface OGPData {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
}

export async function fetchOGP(url: string): Promise<OGPData> {
  try {
    const response = await fetch(url);
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
    console.error('Failed to fetch OGP data:', error);
    return {};
  }
}