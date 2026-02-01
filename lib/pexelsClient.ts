import { createClient, Photo, ErrorResponse, PhotosWithTotalResults } from 'pexels';

// Pexels API client helper
// Used for fetching stock images at build time

export async function searchPexelsImage(
  query: string,
  orientation?: 'landscape' | 'portrait' | 'square',
  size?: 'small' | 'medium' | 'large'
): Promise<string | null> {
  // Check for API key at runtime (after dotenv has loaded)
  const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

  if (!PEXELS_API_KEY) {
    console.warn('PEXELS_API_KEY not found in environment variables');
    return null;
  }

  const client = createClient(PEXELS_API_KEY);

  try {
    const response = await client.photos.search({
      query,
      per_page: 1,
      orientation,
    });

    // Type guard to check if response has photos
    if ('photos' in response && response.photos.length > 0) {
      const photo = response.photos[0] as Photo;

      // Return appropriate size
      if (size === 'large') return photo.src.large2x;
      if (size === 'small') return photo.src.medium;
      return photo.src.large;
    }

    console.warn(`No images found for query: "${query}"`);
    return null;
  } catch (error) {
    console.error(`Pexels API error for query "${query}":`, error);
    return null;
  }
}

// Batch fetch images with delay to avoid rate limiting
export async function batchSearchPexelsImages(
  queries: Array<{
    key: string;
    query: string;
    orientation?: 'landscape' | 'portrait' | 'square';
    size?: 'small' | 'medium' | 'large';
  }>,
  delayMs: number = 500
): Promise<Record<string, string>> {
  const imageMap: Record<string, string> = {};

  for (const item of queries) {
    const imageUrl = await searchPexelsImage(item.query, item.orientation, item.size);
    if (imageUrl) {
      imageMap[item.key] = imageUrl;
    }

    // Delay to avoid rate limiting (200 requests/hour = ~18 seconds between requests)
    // Using 500ms for now, can be adjusted
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }

  return imageMap;
}
