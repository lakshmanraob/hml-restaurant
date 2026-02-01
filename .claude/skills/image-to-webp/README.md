# Image to WebP Converter Skill

A Claude Code skill that downloads images from URLs (like Pexels), resizes them appropriately, and converts them to WebP format for optimal web performance.

## Quick Start

1. **Ensure dependencies are installed:**
   ```bash
   npm install
   ```

2. **Run the skill:**
   ```bash
   npm run convert-images
   ```

   Or use the Claude Code skill directly:
   ```bash
   /image-to-webp
   ```

## What It Does

This skill will:
1. Read all image URLs from `public/data/imageMap.json`
2. Download each image from the remote URL (e.g., Pexels CDN)
3. Resize images based on their type:
   - Hero: 1920x1080px (landscape)
   - Menu items: 800x800px (square)
   - Events: 1200x900px (landscape)
   - About/Chef photos: 600x600px (square)
   - Cultural images: 1200x900px (landscape)
4. Convert to WebP format with 85% quality
5. Save to `public/images/` with organized folder structure
6. Update `imageMap.json` to point to local WebP files instead of remote URLs

## Command Line Options

### Basic Usage
```bash
npm run convert-images
```

### Force Re-download (overwrite existing files)
```bash
npm run convert-images -- --force
```

### Dry Run (preview without downloading)
```bash
npm run convert-images -- --dry-run
```

### Custom Quality (1-100)
```bash
npm run convert-images -- --quality=90
```

### Combined Options
```bash
npm run convert-images -- --force --quality=90
```

## Benefits of WebP

- **25-35% smaller file sizes** compared to JPEG/PNG
- **Faster page load times** for better user experience
- **Local caching** instead of relying on external CDN
- **Automatic optimization** by Next.js Image component
- **Broad browser support** (95%+ of users)

## Example Output

```
🖼️  Image to WebP Converter

📂 Reading image map...
📊 Found 113 images to process

[1/113] Processing: hero
  ⬇️  Downloading: https://images.pexels.com/photos/...
  🔄 Converting to WebP (1920x1080): hero.webp
  ✅ Saved: hero.webp

[2/113] Processing: menuItems.Paneer Tikka
  ⬇️  Downloading: https://images.pexels.com/photos/...
  🔄 Converting to WebP (800x800): menuItems/paneer-tikka.webp
  ✅ Saved: menuItems/paneer-tikka.webp

...

============================================================
📊 Processing Summary
============================================================
✅ Processed: 110
⏭️  Skipped: 0
❌ Failed: 3

✨ Done!
```

## Troubleshooting

### "Failed to download" errors
- Check your internet connection
- Verify the URL is still valid in imageMap.json
- The skill will continue processing other images

### "EPERM: operation not permitted" on Windows
- This is a temporary file cleanup warning, not an error
- The images will still be processed correctly
- You can safely ignore this warning

### Out of memory errors
- Process images in smaller batches
- Reduce the `--quality` setting (e.g., `--quality=80`)
- Close other memory-intensive applications

## File Structure

After running, your directory structure will be:

```
public/
├── images/
│   ├── hero.webp
│   ├── menuItems/
│   │   ├── paneer-tikka.webp
│   │   ├── butter-chicken.webp
│   │   ├── ...
│   ├── events/
│   │   ├── live-music.webp
│   │   ├── diwali.webp
│   │   ├── south-indian-festival.webp
│   │   └── holi.webp
│   └── about/
│       ├── founder.webp
│       ├── chef-1.webp
│       ├── chef-2.webp
│       ├── chef-3.webp
│       ├── culture-1.webp
│       ├── culture-2.webp
│       ├── culture-3.webp
│       └── culture-4.webp
└── data/
    └── imageMap.json (updated with local paths)
```

## Next Steps

After running this skill:

1. **Verify images**: Check `public/images/` to ensure images were downloaded
2. **Test website**: Run `npm run dev` and verify images display correctly
3. **Update Next.js config**: The `images.pexels.com` domain in `next.config.ts` can now be removed (optional)
4. **Commit changes**: Add the new images to git (they're optimized WebP files)

## Performance Impact

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Format | JPEG/PNG | WebP | 25-35% smaller |
| Location | Pexels CDN | Local | Faster, no external dependency |
| Optimization | Pexels auto | Next.js + Sharp | Better control |
| Caching | Browser only | Browser + CDN | Better caching |

## Technical Details

- **Image Processing**: Uses Sharp library (high-performance Node.js image processor)
- **Resize Strategy**: `cover` with center positioning (maintains aspect ratio, crops if needed)
- **WebP Quality**: 85% (good balance between size and quality)
- **Concurrent Processing**: Sequential to avoid memory issues with 100+ images
- **Error Handling**: Graceful - failed images don't stop the process
- **Map Update**: Automatically updates imageMap.json with local paths

## Dependencies

- `sharp`: Fast image processing library
- `tsx`: TypeScript execution
- Node.js built-in: `fs`, `path`, `http`, `https`

## License

Part of the HML Restaurant project.
