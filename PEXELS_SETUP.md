# Pexels Image Integration Setup

This document explains how to set up and use Pexels stock images for the HML Restaurant website.

## Overview

The website uses real stock images from Pexels for all visual content:
- Hero background image
- Menu item images (100+ dishes)
- Event images (4 events)
- About page images (founder, chefs, cultural heritage)

Images are fetched at build time and stored in a JSON mapping file for optimal performance.

## Setup Instructions

### 1. Get a Pexels API Key

1. Visit [https://www.pexels.com/api/](https://www.pexels.com/api/)
2. Sign up for a free account (if you don't have one)
3. Generate an API key from your dashboard
4. Copy your API key

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your Pexels API key:
   ```
   PEXELS_API_KEY=your_actual_api_key_here
   ```

3. Save the file

### 3. Fetch Images

Run the image fetching script to download all images from Pexels:

```bash
npm run fetch-images
```

This script will:
- Read the menu items from `docs/menu_items.csv`
- Search Pexels for relevant images for each item
- Fetch images for events, founder, chefs, and cultural sections
- Save all image URLs to `public/data/imageMap.json`
- Handle rate limiting automatically (500ms delay between requests)

**Note:** The free tier allows 200 requests per hour. The script will take approximately 10-15 minutes to complete for 100+ images.

### 4. Verify Images

After running the script:
1. Check `public/data/imageMap.json` to see the fetched image URLs
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Visit the website and verify images are loading correctly

## Fallback Behavior

If an image fails to load or is not found in the imageMap.json:
- The component will display a gradient placeholder instead
- The gradient colors are category-specific (e.g., orange for appetizers, red for main dishes)
- No errors will be shown to users

## Manual Image Curation

If you want to manually select specific images:

1. Search for images on [Pexels](https://www.pexels.com/)
2. Copy the image URL (from the "src.large" or "src.medium" field)
3. Edit `public/data/imageMap.json` and replace the URL for the specific item
4. Save the file

Example:
```json
{
  "menuItems": {
    "Paneer Tikka": "https://images.pexels.com/photos/12345/...",
    "Butter Chicken": "https://images.pexels.com/photos/67890/..."
  }
}
```

## Updating Menu Items

When you add new items to `docs/menu_items.csv`:
1. Run `npm run fetch-images` again to fetch images for new items
2. The script will preserve existing images and only fetch new ones

## Troubleshooting

### Images not loading
- Check that `.env.local` has the correct API key
- Verify `public/data/imageMap.json` exists and has image URLs
- Check browser console for errors

### Rate limit errors
- The free tier has a limit of 200 requests/hour
- Wait for an hour before running the script again
- Or manually curate specific images

### No results for specific dishes
- Some Indian dish names may not return results from Pexels
- Edit `scripts/fetchPexelsImages.ts` to refine search queries
- Or manually add image URLs to `imageMap.json`

## Performance Notes

- Images are loaded from Pexels CDN (fast and reliable)
- Next.js Image component automatically optimizes images
- Lazy loading is enabled for below-fold images
- Total page load time should remain under 3 seconds

## Credits

All images are provided by [Pexels](https://www.pexels.com/) - free stock photos & videos you can use everywhere.
